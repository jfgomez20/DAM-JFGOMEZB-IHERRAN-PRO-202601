import { AppNotification } from "../../entities";
import AuthRepository from "../../repositories/AuthRepository/AuthRepository";
import EventRepository from "../../repositories/EventRepository/EventRepository";
import NotificationRepository from "../../repositories/NotificationRepository/NotificationRepository";
import UserRepository from "../../repositories/UserRepository/UserRepository";
import PushNotificationNative from "../../native/PushNotificationNative";

const daysBetween = (dateA: Date, dateB: Date) => {
  const oneDay = 1000 * 60 * 60 * 24;

  const startA = new Date(
    dateA.getFullYear(),
    dateA.getMonth(),
    dateA.getDate()
  );

  const startB = new Date(
    dateB.getFullYear(),
    dateB.getMonth(),
    dateB.getDate()
  );

  return Math.ceil((startB.getTime() - startA.getTime()) / oneDay);
};

const createNotificationAndPush = async (
  notification: Omit<AppNotification, "id">
) => {
  NotificationRepository.create(notification);

  await PushNotificationNative.show(
    notification.title,
    notification.message
  );
};

const NotificationService = {
  getForCurrentUser: async (): Promise<AppNotification[]> => {
    const session = await AuthRepository.getSession();

    if (!session?.id) {
      return [];
    }

    await NotificationService.generateEventRemindersForCurrentUser();
    await NotificationService.generateNewEventAlertsForCurrentUser();

    return NotificationRepository.findByUser(session.id);
  },

  markAllAsReadForCurrentUser: async (): Promise<void> => {
    const session = await AuthRepository.getSession();

    if (!session?.id) {
      return;
    }

    NotificationRepository.markAllAsRead(session.id);
  },

  createAttendanceConfirmation: async (eventId: number): Promise<void> => {
    const session = await AuthRepository.getSession();

    if (!session?.id) {
      return;
    }

    const event = EventRepository.findById(eventId);

    if (!event) {
      return;
    }

    const exists = NotificationRepository.exists(
      session.id,
      eventId,
      "attendance"
    );

    if (exists) {
      return;
    }

    await createNotificationAndPush({
      userId: session.id,
      eventId,
      type: "attendance",
      title: "Asistencia confirmada",
      message: `Confirmaste tu asistencia a "${event.title}".`,
      isRead: 0,
      createdAt: new Date().toISOString(),
    });
  },

  generateEventRemindersForCurrentUser: async (): Promise<void> => {
    const session = await AuthRepository.getSession();

    if (!session?.id) {
      return;
    }

    const events = EventRepository.findAll();
    const today = new Date();

    for (const event of events) {
      if (!event.id) continue;

      const eventDate = new Date(event.startDate);
      const diff = daysBetween(today, eventDate);

      const isUpcoming = diff >= 0 && diff <= 3;

      if (!isUpcoming) {
        continue;
      }

      const exists = NotificationRepository.exists(
        session.id,
        event.id,
        "reminder"
      );

      if (exists) {
        continue;
      }

      await createNotificationAndPush({
        userId: session.id,
        eventId: event.id,
        type: "reminder",
        title: "Recordatorio de evento próximo",
        message: `"${event.title}" será el ${event.date} en ${event.location}.`,
        isRead: 0,
        createdAt: new Date().toISOString(),
      });
    }
  },

  generateNewEventAlertsForCurrentUser: async (): Promise<void> => {
    const session = await AuthRepository.getSession();

    if (!session?.id) {
      return;
    }

    const events = EventRepository.findAll();

    for (const event of events) {
      if (!event.id) continue;

      const wasCreatedByOtherUser =
        event.createdByUserId !== null &&
        event.createdByUserId !== undefined &&
        event.createdByUserId !== session.id;

      if (!wasCreatedByOtherUser) {
        continue;
      }

      const exists = NotificationRepository.exists(
        session.id,
        event.id,
        "new_event"
      );

      if (exists) {
        continue;
      }

      await createNotificationAndPush({
        userId: session.id,
        eventId: event.id,
        type: "new_event",
        title: "Nuevo evento disponible",
        message: `Se creó un nuevo evento: "${event.title}".`,
        isRead: 0,
        createdAt: new Date().toISOString(),
      });
    }
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

  deleteByEvent: (eventId: number): void => {
    NotificationRepository.deleteByEvent(eventId);
  },
};

export default NotificationService;