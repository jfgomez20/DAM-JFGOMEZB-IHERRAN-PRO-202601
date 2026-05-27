import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../entities";

const SESSION_KEY = "@EVENTOS_UB_USER_SESSION";

const AuthRepository = {
  saveSession: async (user: User): Promise<void> => {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },

  getSession: async (): Promise<User | null> => {
    const session = await AsyncStorage.getItem(SESSION_KEY);

    if (!session) {
      return null;
    }

    return JSON.parse(session) as User;
  },

  clearSession: async (): Promise<void> => {
    await AsyncStorage.removeItem(SESSION_KEY);
  },
};

export default AuthRepository;