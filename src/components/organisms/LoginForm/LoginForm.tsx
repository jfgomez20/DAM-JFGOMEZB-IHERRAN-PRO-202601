import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button, TextLink } from "../../atoms";
import { FormField } from "../../molecules";
import styles from "./LoginFormStyles";

interface LoginFormProps {
  onSubmit: (correo: string, contrasena: string) => void;
  onGoRegister: () => void;
  loading?: boolean;
}

const LoginForm = ({ onSubmit, onGoRegister, loading = false }: LoginFormProps) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const isValid = correo.trim() && contrasena.trim();

  return (
    <View style={styles.container}>
      <FormField
        label="Correo electrónico"
        placeholder="estudiante@unbosque.edu.co"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormField
        label="Contraseña"
        placeholder="Tu contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secure
      />

      <Button
        title="Iniciar sesión"
        onPress={() => onSubmit(correo, contrasena)}
        disabled={!isValid}
        loading={loading}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿No tienes cuenta? </Text>
        <TextLink text="Regístrate" onPress={onGoRegister} />
      </View>
    </View>
  );
};

export default LoginForm;