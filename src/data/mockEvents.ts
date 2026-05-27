import { InterestCategory } from "../Routes";

export interface EventItem {
  id: number;
  title: string;
  category: InterestCategory;
  date: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
  description: string;
  image: string;
  featured: boolean;
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

export const mockEvents: EventItem[] = [
  {
    id: 1,
    title: "Charla de inteligencia artificial aplicada",
    category: "academico",
    date: "2026-06-08",
    startDate: "2026-06-08T15:00:00",
    endDate: "2026-06-08T17:00:00",
    location: "Auditorio Fundadores",
    organizer: "Facultad de Ingeniería",
    description:
      "Un espacio académico para conocer aplicaciones reales de la inteligencia artificial en educación, salud e industria. La charla contará con invitados expertos, ejemplos prácticos y un espacio de preguntas para estudiantes.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200",
    featured: true,
  },
  {
    id: 2,
    title: "Concierto universitario al aire libre",
    category: "cultural",
    date: "2026-06-12",
    startDate: "2026-06-12T18:00:00",
    endDate: "2026-06-12T21:00:00",
    location: "Plazoleta central",
    organizer: "Bienestar Universitario",
    description:
      "Presentaciones musicales de estudiantes y grupos invitados en un ambiente cultural dentro del campus. Un evento pensado para compartir, relajarse y descubrir talento universitario.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200",
    featured: true,
  },
  {
    id: 3,
    title: "Torneo relámpago de fútbol 5",
    category: "deportivo",
    date: "2026-06-15",
    startDate: "2026-06-15T10:00:00",
    endDate: "2026-06-15T14:00:00",
    location: "Cancha múltiple",
    organizer: "Área de Deportes",
    description:
      "Competencia deportiva para estudiantes con equipos inscritos previamente. Habrá fase de grupos, semifinal y final durante la misma jornada.",
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1200",
    featured: true,
  },
  {
    id: 4,
    title: "Encuentro de integración estudiantil",
    category: "social",
    date: "2026-06-18",
    startDate: "2026-06-18T16:00:00",
    endDate: "2026-06-18T19:00:00",
    location: "Zona verde principal",
    organizer: "Representantes estudiantiles",
    description:
      "Actividad social para conocer estudiantes de diferentes programas y fortalecer la vida universitaria. Tendrá dinámicas, música y espacios de conversación.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200",
    featured: false,
  },
  {
    id: 5,
    title: "Feria de investigación universitaria",
    category: "academico",
    date: "2026-06-21",
    startDate: "2026-06-21T09:00:00",
    endDate: "2026-06-21T13:00:00",
    location: "Bloque Académico",
    organizer: "Dirección de Investigaciones",
    description:
      "Exposición de proyectos de investigación desarrollados por estudiantes y docentes. Ideal para conocer iniciativas académicas y posibles semilleros.",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200",
    featured: false,
  },
  {
    id: 6,
    title: "Muestra de danza y teatro",
    category: "cultural",
    date: "2026-06-25",
    startDate: "2026-06-25T17:00:00",
    endDate: "2026-06-25T20:00:00",
    location: "Teatro principal",
    organizer: "Área Cultural",
    description:
      "Presentación artística con grupos de danza, teatro y expresión corporal. Un espacio para fortalecer la participación cultural universitaria.",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1200",
    featured: false,
  },
  {
    id: 7,
    title: "Reto de baloncesto 3x3",
    category: "deportivo",
    date: "2026-06-29",
    startDate: "2026-06-29T14:00:00",
    endDate: "2026-06-29T17:00:00",
    location: "Coliseo universitario",
    organizer: "Coordinación Deportiva",
    description:
      "Torneo rápido de baloncesto 3x3 para estudiantes. La actividad busca promover el deporte, la integración y la competencia sana.",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200",
    featured: false,
  },
  {
    id: 8,
    title: "Picnic de bienvenida",
    category: "social",
    date: "2026-07-02",
    startDate: "2026-07-02T12:00:00",
    endDate: "2026-07-02T15:00:00",
    location: "Jardines del campus",
    organizer: "Bienestar Universitario",
    description:
      "Espacio social para estudiantes nuevos y antiguos. Habrá música, actividades grupales y puntos de información sobre servicios universitarios.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200",
    featured: true,
  },
];