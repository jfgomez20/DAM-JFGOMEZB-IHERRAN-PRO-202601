import React, { useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import {
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";

import { AppNotification } from "../../core/entities";
import NotificationService from "../../core/services/NotificationService/NotificationService";
import styles from "./NotificationsPageStyles";

const getIcon = (type: AppNotification["type"]) => {
  if (type === "reminder") return "⏰";
  if (type === "attendance") return "✅";
  return "✨";
};

const NotificationsPage = () => {
  const navigation = useNavigation<any>();

  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const loadNotifications = async () => {
    const items = await NotificationService.getForCurrentUser();
    setNotifications(items);
    await NotificationService.markAllAsReadForCurrentUser();
  };

  useFocusEffect(
    useCallback(() => {
      loadNotifications();
    }, [])
  );

  const handleOpenNotification = (notification: AppNotification) => {
    if (!notification.eventId) {
      return;
    }

    navigation.navigate("EventDetail", {
      eventId: notification.eventId,
    });
  };

  const renderItem = ({ item }: { item: AppNotification }) => (
    <Pressable
      style={[
        styles.notificationCard,
        item.isRead === 0 && styles.unreadCard,
      ]}
      onPress={() => handleOpenNotification(item)}
    >
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{getIcon(item.type)}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.title}>{item.title}</Text>

          {item.isRead === 0 && <View style={styles.unreadDot} />}
        </View>

        <Text style={styles.message}>{item.message}</Text>

        <Text style={styles.date}>
          {item.createdAt ? item.createdAt.slice(0, 10) : ""}
        </Text>
      </View>
    </Pressable>
  );

  const renderEmpty = () => (
    <View style={styles.emptyBox}>
      <Text style={styles.emptyIcon}>🔔</Text>
      <Text style={styles.emptyTitle}>Sin notificaciones</Text>
      <Text style={styles.emptyText}>
        Aquí aparecerán recordatorios, confirmaciones y nuevos eventos.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.pageTitle}>Notificaciones</Text>
            <Text style={styles.subtitle}>
              Recordatorios, confirmaciones y novedades de EventosUB.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default NotificationsPage;