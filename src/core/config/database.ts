import { open } from "react-native-quick-sqlite";

export const db = open({
  name: "events_app.sqlite",
});

const addColumnIfNotExists = (table: string, columnDefinition: string) => {
  try {
    db.execute(`ALTER TABLE ${table} ADD COLUMN ${columnDefinition};`);
  } catch (error) {
    // Si la columna ya existe, SQLite lanza error. Lo ignoramos.
  }
};

export const setupDatabase = () => {
  try {
    db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        correo TEXT NOT NULL UNIQUE,
        contrasena TEXT NOT NULL,
        profileImage TEXT,
        createdAt TEXT NOT NULL
      );
    `);

    addColumnIfNotExists("users", "profileImage TEXT");

    db.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        startDate TEXT NOT NULL,
        endDate TEXT NOT NULL,
        location TEXT NOT NULL,
        organizer TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        featured INTEGER NOT NULL DEFAULT 0,
        createdByUserId INTEGER,
        isDefault INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL
      );
    `);

    db.execute(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        eventId INTEGER,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        isRead INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL
      );
    `);
  } catch (error) {
    console.error("Error inicializando la base de datos:", error);
  }
};