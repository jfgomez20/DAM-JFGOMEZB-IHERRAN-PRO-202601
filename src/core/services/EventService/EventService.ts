import { InterestCategory } from "../../../Routes";
import { seedEvents } from "../../../data/seedEvents";
import { Event } from "../../entities";
import AuthRepository from "../../repositories/AuthRepository/AuthRepository";
import EventRepository from "../../repositories/EventRepository/EventRepository";
import NotificationService from "../NotificationService/NotificationService";

export interface CreateEventData {
  title: string;
  category: InterestCategory;
  date: string;
  location: string;
  description: string;
  image: string;
}

export interface UpdateEventData {
  title: string;
  date: string;
  location: string;
  description: string;
}

export const getCategoryLabel = (category: InterestCategory) => {
  const labels: Record<InterestCategory, string> = {
    academico: "Académico",
    cultural: "Cultural",
    deportivo: "Deportivo",
    social: "Social",
  };

  return labels[category];
};

const getNowIsoWithoutMilliseconds = () => {
  return new Date().toISOString().split(".")[0];
};

const buildStartDate = (date: string) => {
  return `${date}T09:00:00`;
};

const buildEndDate = (date: string) => {
  return `${date}T11:00:00`;
};

const validateDate = (date: string) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
};

const EventService = {
  seedDefaultEvents: (): void => {
    const now = getNowIsoWithoutMilliseconds();

    const validSeedEvents = seedEvents.filter((event) => event.endDate >= now);

    EventRepository.seedDefaults(validSeedEvents);
  },

  deleteExpiredEvents: (): void => {
    EventRepository.deleteExpired(getNowIsoWithoutMilliseconds());
  },

  getAll: (): Event[] => {
    EventService.deleteExpiredEvents();
    return EventRepository.findAll();
  },

  getById: (id: number): Event | null => {
    EventService.deleteExpiredEvents();
    return EventRepository.findById(id);
  },

  getCreatedByCurrentUser: async (): Promise<Event[]> => {
    const session = await AuthRepository.getSession();

    if (!session?.id) {
      return [];
    }

    EventService.deleteExpiredEvents();

    return EventRepository.findByCreator(session.id);
  },

  create: async (data: CreateEventData): Promise<Event> => {
    const session = await AuthRepository.getSession();

    if (!session?.id) {
      throw new Error("No hay usuario autenticado.");
    }

    if (!data.title.trim()) {
      throw new Error("El título es obligatorio.");
    }

    if (!validateDate(data.date)) {
      throw new Error("Selecciona una fecha válida.");
    }

    if (!data.location.trim()) {
      throw new Error("La ubicación es obligatoria.");
    }

    if (!data.description.trim()) {
      throw new Error("La descripción es obligatoria.");
    }

    if (!data.image.trim()) {
      throw new Error("Debes seleccionar una imagen.");
    }

    const eventToCreate: Omit<Event, "id"> = {
      title: data.title.trim(),
      category: data.category,
      date: data.date.trim(),
      startDate: buildStartDate(data.date.trim()),
      endDate: buildEndDate(data.date.trim()),
      location: data.location.trim(),
      organizer: String(session.nombre),
      description: data.description.trim(),
      image: data.image,
      featured: 0,
      createdByUserId: session.id,
      isDefault: 0,
      createdAt: new Date().toISOString(),
    };

    const id = EventRepository.create(eventToCreate);

    if (id) {
      await NotificationService.createNewEventAlertForOtherUsers(
        id,
        session.id
      );
    }

    return {
      ...eventToCreate,
      id,
    };
  },

  update: async (eventId: number, data: UpdateEventData): Promise<void> => {
    const session = await AuthRepository.getSession();

    if (!session?.id) {
      throw new Error("No hay usuario autenticado.");
    }

    const event = EventRepository.findById(eventId);

    if (!event) {
      throw new Error("El evento no existe.");
    }

    if (event.createdByUserId !== session.id) {
      throw new Error("Solo puedes editar los eventos que tú creaste.");
    }

    if (!data.title.trim()) {
      throw new Error("El título es obligatorio.");
    }

    if (!validateDate(data.date)) {
      throw new Error("Selecciona una fecha válida.");
    }

    if (!data.location.trim()) {
      throw new Error("La ubicación es obligatoria.");
    }

    if (!data.description.trim()) {
      throw new Error("La descripción es obligatoria.");
    }

    EventRepository.updateUserEvent(eventId, session.id, {
      title: data.title.trim(),
      date: data.date.trim(),
      startDate: buildStartDate(data.date.trim()),
      endDate: buildEndDate(data.date.trim()),
      location: data.location.trim(),
      description: data.description.trim(),
    });
  },

  delete: async (eventId: number): Promise<void> => {
    const session = await AuthRepository.getSession();

    if (!session?.id) {
      throw new Error("No hay usuario autenticado.");
    }

    const event = EventRepository.findById(eventId);

    if (!event) {
      throw new Error("El evento no existe.");
    }

    if (event.createdByUserId !== session.id) {
      throw new Error("Solo puedes borrar los eventos que tú creaste.");
    }

    EventRepository.deleteUserEvent(eventId, session.id);
    NotificationService.deleteByEvent(eventId);
  },
};

export default EventService;