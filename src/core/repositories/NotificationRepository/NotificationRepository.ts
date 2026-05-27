import { db } from "../../config";
import { AppNotification, NotificationType } from "../../entities";
import UserRepository from "../../repositories/UserRepository/UserRepository";

const mapRows = <T>(rows: any): T[] => {
  if (!rows) return [];

  if (rows._array) {
    return rows._array as T[];
  }

  const result: T[] = [];

  for (let i = 0; i < rows.length; i++) {
    result.push(rows.item(i));
  }

  return result;
};

const NotificationRepository = {
  create: (notification: Omit<AppNotification, "id">): number | undefined => {
    const query = `
      INSERT INTO notifications (
        userId,
        eventId,
        type,
        title,
        message,
        isRead,
        createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const result = db.execute(query, [
      notification.userId,
      notification.eventId ?? null,
      notification.type,
      notification.title,
      notification.message,
      notification.isRead,
      notification.createdAt ?? new Date().toISOString(),
    ]);

    return result.insertId;
  },

  findByUser: (userId: number): AppNotification[] => {
    const query = `
      SELECT * FROM notifications
      WHERE userId = ?
      ORDER BY createdAt DESC, id DESC;
    `;

    const { rows } = db.execute(query, [userId]);
    return mapRows<AppNotification>(rows);
  },

  markAllAsRead: (userId: number): void => {
    const query = `
      UPDATE notifications
      SET isRead = 1
      WHERE userId = ?;
    `;

    db.execute(query, [userId]);
  },

  exists: (
    userId: number,
    eventId: number | null,
    type: NotificationType
  ): boolean => {
    const query = `
      SELECT * FROM notifications
      WHERE userId = ?
        AND type = ?
        AND (
          eventId = ?
          OR (? IS NULL AND eventId IS NULL)
        )
      LIMIT 1;
    `;

    const { rows } = db.execute(query, [userId, type, eventId, eventId]);
    const results = mapRows<AppNotification>(rows);

    return results.length > 0;
  },

  deleteByEvent: (eventId: number): void => {
    const query = `
      DELETE FROM notifications
      WHERE eventId = ?;
    `;

    db.execute(query, [eventId]);
  },

createNewEventAlertForOtherUsers: async (
  eventId: number,
  creatorUserId: number
): Promise<void> => {
  const users = UserRepository.findAll();
  const event = EventRepository.findById(eventId);

  if (!event) {
    return;
  }

  for (const user of users) {
    if (!user.id) continue;
    if (user.id === creatorUserId) continue;

    const exists = NotificationRepository.exists(
      user.id,
      eventId,
      "new_event"
    );

    if (exists) continue;

    NotificationRepository.create({
      userId: user.id,
      eventId,
      type: "new_event",
      title: "Nuevo evento disponible",
      message: `Se creó un nuevo evento: "${event.title}".`,
      isRead: 0,
      createdAt: new Date().toISOString(),
    });
  }
},
};

export default NotificationRepository;