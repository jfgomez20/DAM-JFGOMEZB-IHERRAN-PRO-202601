import React, { useState } from "react";
import { Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { AuthTemplate } from "../../components/templates";
import { RegisterForm } from "../../components/organisms";
import { AuthService } from "../../core/services";
import { RootStackParamList } from "../../Routes";
import { useAppContext } from "../../context/AppContext";

const RegisterPage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { refreshUserData } = useAppContext();

  const [loading, setLoading] = useState(false);

  const handleRegister = async (
    nombre: string,
    correo: string,
    contrasena: string
  ) => {
    try {
      setLoading(true);

      await AuthService.register(nombre, correo, contrasena);

      await refreshUserData();

      navigation.reset({
        index: 0,
        routes: [{ name: "Onboarding" }],
      });
    } catch (error: any) {
      Alert.alert(
        "No se pudo crear la cuenta",
        error?.message || "Intenta nuevamente"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthTemplate
      title="Crea tu cuenta"
      subtitle="Regístrate rápido para guardar eventos, recibir recordatorios y descubrir actividades según tus intereses."
    >
      <RegisterForm
        onSubmit={handleRegister}
        onGoLogin={() => navigation.navigate("Login")}
        loading={loading}
      />
    </AuthTemplate>
  );
};

export default RegisterPage;