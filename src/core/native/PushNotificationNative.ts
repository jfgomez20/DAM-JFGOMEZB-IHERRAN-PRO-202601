import { NativeModules, Platform } from "react-native";

const { NotificationModule } = NativeModules;

const PushNotificationNative = {
  requestPermission: async (): Promise<void> => {
    if (Platform.OS !== "android") {
      return;
    }

    if (!NotificationModule) {
      console.warn("NotificationModule no está disponible.");
      return;
    }

    await NotificationModule.requestPermission();
  },

  show: async (title: string, body: string): Promise<void> => {
    try {
      if (Platform.OS !== "android") {
        return;
      }

      if (!NotificationModule) {
        console.warn("NotificationModule no está disponible.");
        return;
      }

      await NotificationModule.requestPermission();
      await NotificationModule.showNotification(title, body);
    } catch (error) {
      console.error("Error mostrando notificación local:", error);
    }
  },
};

export default PushNotificationNative;