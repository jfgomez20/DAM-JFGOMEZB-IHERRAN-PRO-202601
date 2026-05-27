import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button, TextLink } from "../../atoms";
import { FormField } from "../../molecules";
import styles from "./RegisterFormStyles";

interface RegisterFormProps {
  onSubmit: (nombre: string, correo: string, contrasena: string) => void;
  onGoLogin: () => void;
  loading?: boolean;
}

const RegisterForm = ({
  onSubmit,
  onGoLogin,
  loading = false,
}: RegisterFormProps) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const isValid =
    nombre.trim() &&
    correo.trim() &&
    contrasena.length >= 6 &&
    contrasena === confirmar;

  return (
    <View style={styles.container}>
      <FormField
        label="Nombre"
        placeholder="Tu nombre"
        value={nombre}
        onChangeText={setNombre}
      />

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
        placeholder="Mínimo 6 caracteres"
        value={contrasena}
        onChangeText={setContrasena}
        secure
      />

      <FormField
        label="Confirmar contraseña"
        placeholder="Repite tu contraseña"
        value={confirmar}
        onChangeText={setConfirmar}
        secure
      />

      <Button
        title="Crear cuenta"
        onPress={() => onSubmit(nombre, correo, contrasena)}
        disabled={!isValid}
        loading={loading}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
        <TextLink text="Inicia sesión" onPress={onGoLogin} />
      </View>
    </View>
  );
};

export default RegisterForm;