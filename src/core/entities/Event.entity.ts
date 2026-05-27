import { InterestCategory } from "../../Routes";

export interface Event {
  id?: number;
  title: string;
  category: InterestCategory;
  date: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
  description: string;
  image: string;
  featured: number;
  createdByUserId?: number | null;
  isDefault: number;
  createdAt?: string;
}