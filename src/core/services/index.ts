export { default as AuthService } from "./AuthService/AuthService";
export { default as EventService } from "./EventService/EventService";
export { default as NotificationService } from "./NotificationService/NotificationService";

export { getCategoryLabel } from "./EventService/EventService";

export type {
  CreateEventData,
  UpdateEventData,
} from "./EventService/EventService";