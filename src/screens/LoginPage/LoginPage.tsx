import React, { useState } from "react";
import { Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { AuthTemplate } from "../../components/templates";
import { LoginForm } from "../../components/organisms";
import { AuthService } from "../../core/services";
import { RootStackParamList } from "../../Routes";
import { useAppContext } from "../../context/AppContext";

const LoginPage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { hasInterests, refreshUserData } = useAppContext();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (correo: string, contrasena: string) => {
    try {
      setLoading(true);

      await AuthService.login(correo, contrasena);

      await refreshUserData();

      navigation.reset({
        index: 0,
        routes: [{ name: hasInterests ? "Main" : "Onboarding" }],
      });
    } catch (error: any) {
      Alert.alert(
        "No se pudo iniciar sesión",
        error?.message || "Revisa tus datos"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthTemplate
      title="Bienvenido"
      subtitle="Entra a EventosUB y encuentra las actividades académicas, culturales y deportivas de tu campus."
    >
      <LoginForm
        onSubmit={handleLogin}
        onGoRegister={() => navigation.navigate("Register")}
        loading={loading}
      />
    </AuthTemplate>
  );
};

export default LoginPage;