import { User } from "../../entities";
import AuthRepository from "../../repositories/AuthRepository/AuthRepository";
import UserRepository from "../../repositories/UserRepository/UserRepository";

const validateEmail = (correo: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
};

const AuthService = {
  register: async (
    nombre: string,
    correo: string,
    contrasena: string
  ): Promise<User> => {
    if (!nombre.trim()) {
      throw new Error("El nombre es obligatorio");
    }

    if (!validateEmail(correo)) {
      throw new Error("Ingresa un correo válido");
    }

    if (contrasena.length < 6) {
      throw new Error("La contraseña debe tener mínimo 6 caracteres");
    }

    const userExists = UserRepository.findByEmail(correo);

    if (userExists) {
      throw new Error("Ya existe una cuenta con este correo");
    }

    const userToCreate: Omit<User, "id"> = {
      nombre: nombre.trim(),
      correo: correo.trim().toLowerCase(),
      contrasena,
      profileImage: null,
      createdAt: new Date().toISOString(),
    };

    const id = UserRepository.create(userToCreate);

    const newUser: User = {
      ...userToCreate,
      id,
    };

    await AuthRepository.saveSession(newUser);

    return newUser;
  },

  login: async (correo: string, contrasena: string): Promise<User> => {
    if (!validateEmail(correo)) {
      throw new Error("Ingresa un correo válido");
    }

    if (!contrasena) {
      throw new Error("La contraseña es obligatoria");
    }

    const user = UserRepository.findByEmail(correo);

    if (!user) {
      throw new Error("No existe una cuenta con este correo");
    }

    if (user.contrasena !== contrasena) {
      throw new Error("Contraseña incorrecta");
    }

    await AuthRepository.saveSession(user);

    return user;
  },

  getSession: async (): Promise<User | null> => {
    return AuthRepository.getSession();
  },

  updateProfileImage: async (profileImage: string): Promise<User> => {
    const session = await AuthRepository.getSession();

    if (!session?.id) {
      throw new Error("No hay usuario autenticado.");
    }

    UserRepository.updateProfileImage(session.id, profileImage);

    const updatedUser: User = {
      ...session,
      profileImage,
    };

    await AuthRepository.saveSession(updatedUser);

    return updatedUser;
  },

  logout: async (): Promise<void> => {
    await AuthRepository.clearSession();
  },
};

export default AuthService;