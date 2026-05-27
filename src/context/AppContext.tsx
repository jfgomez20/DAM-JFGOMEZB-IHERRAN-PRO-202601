import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { InterestCategory } from "../Routes";
import NotificationService from "../core/services/NotificationService/NotificationService";
import AuthService from "../core/services/AuthService/AuthService";

const INTERESTS_KEY = "@EVENTOS_UB_INTERESTS";

const getSavedEventsKey = (userId: number) => {
  return `@EVENTOS_UB_SAVED_EVENTS_USER_${userId}`;
};

const getAttendingEventsKey = (userId: number) => {
  return `@EVENTOS_UB_ATTENDING_EVENTS_USER_${userId}`;
};

interface AppContextValue {
  interests: InterestCategory[];
  setUserInterests: (items: InterestCategory[]) => Promise<void>;
  hasInterests: boolean;
  loadingInterests: boolean;

  savedEventIds: number[];
  attendingEventIds: number[];

  refreshUserData: () => Promise<void>;
  clearUserData: () => void;

  saveEvent: (eventId: number) => Promise<void>;
  removeSavedEvent: (eventId: number) => Promise<void>;
  isEventSaved: (eventId: number) => boolean;

  confirmAttendance: (eventId: number) => Promise<void>;
  isAttendanceConfirmed: (eventId: number) => boolean;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [interests, setInterests] = useState<InterestCategory[]>([]);
  const [savedEventIds, setSavedEventIds] = useState<number[]>([]);
  const [attendingEventIds, setAttendingEventIds] = useState<number[]>([]);
  const [loadingInterests, setLoadingInterests] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const storedInterests = await AsyncStorage.getItem(INTERESTS_KEY);

        if (storedInterests) {
          setInterests(JSON.parse(storedInterests));
        }

        await refreshUserData();
      } catch (error) {
        console.error("Error cargando datos globales:", error);
      } finally {
        setLoadingInterests(false);
      }
    };

    loadInitialData();
  }, []);

  const getCurrentUserId = async (): Promise<number> => {
    const session = await AuthService.getSession();

    if (!session?.id) {
      throw new Error("No hay usuario autenticado.");
    }

    return session.id;
  };

  const refreshUserData = async () => {
    try {
      const session = await AuthService.getSession();

      if (!session?.id) {
        setSavedEventIds([]);
        setAttendingEventIds([]);
        return;
      }

      const storedSavedEvents = await AsyncStorage.getItem(
        getSavedEventsKey(session.id)
      );

      const storedAttendance = await AsyncStorage.getItem(
        getAttendingEventsKey(session.id)
      );

      setSavedEventIds(storedSavedEvents ? JSON.parse(storedSavedEvents) : []);
      setAttendingEventIds(storedAttendance ? JSON.parse(storedAttendance) : []);
    } catch (error) {
      console.error("Error cargando datos del usuario:", error);
      setSavedEventIds([]);
      setAttendingEventIds([]);
    }
  };

  const clearUserData = () => {
    setSavedEventIds([]);
    setAttendingEventIds([]);
  };

  const setUserInterests = async (items: InterestCategory[]) => {
    setInterests(items);
    await AsyncStorage.setItem(INTERESTS_KEY, JSON.stringify(items));
  };

  const saveEvent = async (eventId: number) => {
    const userId = await getCurrentUserId();

    const next = savedEventIds.includes(eventId)
      ? savedEventIds
      : [...savedEventIds, eventId];

    setSavedEventIds(next);

    await AsyncStorage.setItem(
      getSavedEventsKey(userId),
      JSON.stringify(next)
    );
  };

  const removeSavedEvent = async (eventId: number) => {
    const userId = await getCurrentUserId();

    const next = savedEventIds.filter((id) => id !== eventId);

    setSavedEventIds(next);

    await AsyncStorage.setItem(
      getSavedEventsKey(userId),
      JSON.stringify(next)
    );
  };

  const isEventSaved = (eventId: number) => {
    return savedEventIds.includes(eventId);
  };

  const confirmAttendance = async (eventId: number) => {
    const userId = await getCurrentUserId();

    const next = attendingEventIds.includes(eventId)
      ? attendingEventIds
      : [...attendingEventIds, eventId];

    setAttendingEventIds(next);

    await AsyncStorage.setItem(
      getAttendingEventsKey(userId),
      JSON.stringify(next)
    );

    await NotificationService.createAttendanceConfirmation(eventId);
  };

  const isAttendanceConfirmed = (eventId: number) => {
    return attendingEventIds.includes(eventId);
  };

  const value = useMemo(
    () => ({
      interests,
      setUserInterests,
      hasInterests: interests.length > 0,
      loadingInterests,

      savedEventIds,
      attendingEventIds,

      refreshUserData,
      clearUserData,

      saveEvent,
      removeSavedEvent,
      isEventSaved,

      confirmAttendance,
      isAttendanceConfirmed,
    }),
    [interests, loadingInterests, savedEventIds, attendingEventIds]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext debe usarse dentro de AppProvider");
  }

  return context;
};