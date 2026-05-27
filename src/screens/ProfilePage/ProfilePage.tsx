import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";

import { Button } from "../../components/atoms";
import { useAppContext } from "../../context/AppContext";
import { Event, User } from "../../core/entities";
import { AuthService, EventService, getCategoryLabel } from "../../core/services";
import styles from "./ProfilePageStyles";

type ProfileTab = "guardados" | "asistidos" | "creados";

const ProfilePage = () => {
  const navigation = useNavigation<any>();

  const { savedEventIds, attendingEventIds, clearUserData } = useAppContext();

  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<ProfileTab>("guardados");

  const loadProfile = async () => {
    const session = await AuthService.getSession();
    setUser(session);

    const allEvents = EventService.getAll();
    const myCreatedEvents = await EventService.getCreatedByCurrentUser();

    setEvents(allEvents);
    setCreatedEvents(myCreatedEvents);
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [savedEventIds, attendingEventIds])
  );

  const savedEvents = useMemo(() => {
    return events.filter((event) => event.id && savedEventIds.includes(event.id));
  }, [events, savedEventIds]);

  const attendingEvents = useMemo(() => {
    return events.filter(
      (event) => event.id && attendingEventIds.includes(event.id)
    );
  }, [events, attendingEventIds]);

  const visibleEvents = useMemo(() => {
    if (activeTab === "guardados") {
      return savedEvents;
    }

    if (activeTab === "asistidos") {
      return attendingEvents;
    }

    return createdEvents;
  }, [activeTab, savedEvents, attendingEvents, createdEvents]);

  const handlePickProfileImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        quality: 0.8,
        selectionLimit: 1,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorMessage) {
        Alert.alert("Error", result.errorMessage);
        return;
      }

      const uri = result.assets?.[0]?.uri;

      if (!uri) {
        return;
      }

      const updatedUser = await AuthService.updateProfileImage(uri);
      setUser(updatedUser);

      Alert.alert("Foto actualizada", "Tu foto de perfil fue guardada.");
    } catch (error: any) {
      Alert.alert(
        "No se pudo actualizar la foto",
        error?.message || "Intenta nuevamente."
      );
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Seguro que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: async () => {
            await AuthService.logout();

            clearUserData();

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            );
          },
        },
      ]
    );
  };

  const handleOpenEvent = (eventId?: number) => {
    if (!eventId) return;

    navigation.navigate("EventDetail", {
      eventId,
    });
  };

  const renderEvent = ({ item }: { item: Event }) => (
    <Pressable style={styles.eventCard} onPress={() => handleOpenEvent(item.id)}>
      <Image source={{ uri: item.image }} style={styles.eventImage} />

      <View style={styles.eventInfo}>
        <Text style={styles.eventCategory}>
          {getCategoryLabel(item.category).toUpperCase()}
        </Text>

        <Text numberOfLines={2} style={styles.eventTitle}>
          {item.title}
        </Text>

        <Text style={styles.eventMeta}>
          {item.date} · {item.location}
        </Text>

        <Text numberOfLines={2} style={styles.eventDescription}>
          {item.description}
        </Text>
      </View>
    </Pressable>
  );

  const renderEmpty = () => {
    const message =
      activeTab === "guardados"
        ? "Todavía no tienes eventos guardados."
        : activeTab === "asistidos"
        ? "Todavía no has confirmado asistencia a eventos."
        : "Todavía no has creado eventos.";

    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyIcon}>📭</Text>
        <Text style={styles.emptyTitle}>Sin eventos</Text>
        <Text style={styles.emptyText}>{message}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleEvents}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={renderEvent}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <View style={styles.profileHeader}>
              <Pressable
                style={styles.avatarContainer}
                onPress={handlePickProfileImage}
              >
                {user?.profileImage ? (
                  <Image
                    source={{ uri: user.profileImage }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarIcon}>👤</Text>
                  </View>
                )}
              </Pressable>

              <Text style={styles.name}>{user?.nombre || "Usuario"}</Text>

              <Text style={styles.email}>{user?.correo || ""}</Text>

              <View style={styles.photoButton}>
                <Button
                  title={user?.profileImage ? "Cambiar foto" : "Agregar foto"}
                  onPress={handlePickProfileImage}
                  variant="ghost"
                />
              </View>

              <View style={styles.logoutButton}>
                <Button
                  title="Cerrar sesión"
                  onPress={handleLogout}
                  variant="ghost"
                />
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{savedEvents.length}</Text>
                <Text style={styles.statLabel}>Guardados</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{attendingEvents.length}</Text>
                <Text style={styles.statLabel}>Asistidos</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{createdEvents.length}</Text>
                <Text style={styles.statLabel}>Creados</Text>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabs}
            >
              <Pressable
                style={[
                  styles.tab,
                  activeTab === "guardados" && styles.tabActive,
                ]}
                onPress={() => setActiveTab("guardados")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "guardados" && styles.tabTextActive,
                  ]}
                >
                  Guardados
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.tab,
                  activeTab === "asistidos" && styles.tabActive,
                ]}
                onPress={() => setActiveTab("asistidos")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "asistidos" && styles.tabTextActive,
                  ]}
                >
                  Asistidos
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.tab,
                  activeTab === "creados" && styles.tabActive,
                ]}
                onPress={() => setActiveTab("creados")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "creados" && styles.tabTextActive,
                  ]}
                >
                  Creados
                </Text>
              </Pressable>
            </ScrollView>

            <Text style={styles.sectionTitle}>
              {activeTab === "guardados"
                ? "Eventos guardados"
                : activeTab === "asistidos"
                ? "Historial de asistencias"
                : "Eventos creados por ti"}
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default ProfilePage;