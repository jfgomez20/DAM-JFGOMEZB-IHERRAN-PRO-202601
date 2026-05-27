import { db } from "../../config";
import { Event } from "../../entities";

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

const EventRepository = {
  seedDefaults: (events: Event[]): void => {
    events.forEach((event) => {
      const query = `
        INSERT OR IGNORE INTO events (
          id,
          title,
          category,
          date,
          startDate,
          endDate,
          location,
          organizer,
          description,
          image,
          featured,
          createdByUserId,
          isDefault,
          createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;

      db.execute(query, [
        event.id,
        event.title,
        event.category,
        event.date,
        event.startDate,
        event.endDate,
        event.location,
        event.organizer,
        event.description,
        event.image,
        event.featured,
        event.createdByUserId ?? null,
        event.isDefault,
        event.createdAt ?? new Date().toISOString(),
      ]);
    });
  },

  deleteExpired: (nowIso: string): void => {
    const query = `
      DELETE FROM events
      WHERE endDate < ?;
    `;

    db.execute(query, [nowIso]);
  },

  findAll: (): Event[] => {
    const query = `
      SELECT * FROM events
      ORDER BY date ASC, id DESC;
    `;

    const { rows } = db.execute(query);
    return mapRows<Event>(rows);
  },

  findById: (id: number): Event | null => {
    const query = `
      SELECT * FROM events
      WHERE id = ?
      LIMIT 1;
    `;

    const { rows } = db.execute(query, [id]);
    const events = mapRows<Event>(rows);

    return events.length > 0 ? events[0] : null;
  },

  create: (event: Omit<Event, "id">): number | undefined => {
    const query = `
      INSERT INTO events (
        title,
        category,
        date,
        startDate,
        endDate,
        location,
        organizer,
        description,
        image,
        featured,
        createdByUserId,
        isDefault,
        createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const result = db.execute(query, [
      event.title,
      event.category,
      event.date,
      event.startDate,
      event.endDate,
      event.location,
      event.organizer,
      event.description,
      event.image,
      event.featured,
      event.createdByUserId ?? null,
      event.isDefault,
      event.createdAt ?? new Date().toISOString(),
    ]);

    return result.insertId;
  },

  updateUserEvent: (
    id: number,
    userId: number,
    data: {
      title: string;
      date: string;
      startDate: string;
      endDate: string;
      location: string;
      description: string;
    }
  ): void => {
    const query = `
      UPDATE events
      SET title = ?,
          date = ?,
          startDate = ?,
          endDate = ?,
          location = ?,
          description = ?
      WHERE id = ?
        AND createdByUserId = ?;
    `;

    db.execute(query, [
      data.title,
      data.date,
      data.startDate,
      data.endDate,
      data.location,
      data.description,
      id,
      userId,
    ]);
  },

  deleteUserEvent: (id: number, userId: number): void => {
    const query = `
      DELETE FROM events
      WHERE id = ?
        AND createdByUserId = ?;
    `;

    db.execute(query, [id, userId]);
  },

  findByCreator: (userId: number): Event[] => {
    const query = `
      SELECT * FROM events
      WHERE createdByUserId = ?
      ORDER BY date ASC;
    `;

    const { rows } = db.execute(query, [userId]);
    return mapRows<Event>(rows);
  },
};

export default EventRepository;