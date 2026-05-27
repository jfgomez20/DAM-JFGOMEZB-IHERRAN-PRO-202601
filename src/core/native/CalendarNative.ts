import { NativeModules, Platform } from "react-native";

const { CalendarModule } = NativeModules;

interface CalendarEventData {
  title: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
}

export const CalendarNative = {
  addEvent: async (event: CalendarEventData): Promise<void> => {
    if (Platform.OS !== "android") {
      throw new Error("La integración actual de calendario está disponible para Android.");
    }

    if (!CalendarModule) {
      throw new Error("CalendarModule no está disponible. Revisa el módulo nativo Android.");
    }

    const startTime = new Date(event.startDate).getTime();
    const endTime = new Date(event.endDate).getTime();

    if (Number.isNaN(startTime) || Number.isNaN(endTime)) {
      throw new Error("Las fechas del evento no son válidas.");
    }

    await CalendarModule.addEventToCalendar(
      event.title,
      event.location,
      event.description,
      startTime,
      endTime
    );
  },
};