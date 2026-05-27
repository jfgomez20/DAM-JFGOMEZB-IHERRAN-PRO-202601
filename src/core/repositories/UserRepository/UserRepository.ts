import { db } from "../../config";
import { User } from "../../entities";

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

const UserRepository = {
  create: (user: Omit<User, "id">): number | undefined => {
    const query = `
      INSERT INTO users (
        nombre, correo, contrasena, profileImage, createdAt
      ) VALUES (?, ?, ?, ?, ?);
    `;

    const result = db.execute(query, [
      user.nombre.trim(),
      user.correo.trim().toLowerCase(),
      user.contrasena,
      user.profileImage ?? null,
      user.createdAt ?? new Date().toISOString(),
    ]);

    return result.insertId;
  },

  findAll: (): User[] => {
    const query = `
      SELECT * FROM users
      ORDER BY id ASC;
    `;

    const { rows } = db.execute(query);
    return mapRows<User>(rows);
  },

  findByEmail: (correo: string): User | null => {
    const query = `
      SELECT * FROM users
      WHERE correo = ?
      LIMIT 1;
    `;

    const { rows } = db.execute(query, [correo.trim().toLowerCase()]);
    const users = mapRows<User>(rows);

    return users.length > 0 ? users[0] : null;
  },

  findById: (id: number): User | null => {
    const query = `
      SELECT * FROM users
      WHERE id = ?
      LIMIT 1;
    `;

    const { rows } = db.execute(query, [id]);
    const users = mapRows<User>(rows);

    return users.length > 0 ? users[0] : null;
  },

  updateProfileImage: (id: number, profileImage: string): void => {
    const query = `
      UPDATE users
      SET profileImage = ?
      WHERE id = ?;
    `;

    db.execute(query, [profileImage, id]);
  },

  delete: (id: number): void => {
    const query = `
      DELETE FROM users
      WHERE id = ?;
    `;

    db.execute(query, [id]);
  },
};

export default UserRepository;