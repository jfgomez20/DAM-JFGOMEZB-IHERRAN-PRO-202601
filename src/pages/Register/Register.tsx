import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { theme } from '../../styles/theme';
import Input from '../../components/atoms/Input/Input';
import Button from '../../components/atoms/Button/Button';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const Register = () => {
  const navigation = useNavigation<NavProp>();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = () => {
    if (!nombre || !email || !password || !confirm) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    navigation.replace('Interests');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Crear Cuenta</Text>
        <Text style={styles.subtitle}>Únete a la comunidad universitaria</Text>
        <View style={styles.form}>
          <Input placeholder="Nombre completo" value={nombre} onChangeText={setNombre} />
          <Input placeholder="Correo institucional" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Input placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
          <Input placeholder="Confirmar contraseña" value={confirm} onChangeText={setConfirm} secureTextEntry />
          <Button label="Crear cuenta" onPress={handleRegister} />
        </View>
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Inicia sesion</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  scroll: { flexGrow: 1, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.xxl, alignItems: 'center' },
  title: { fontSize: theme.fonts.sizes.xxl, fontWeight: theme.fonts.weights.bold, color: theme.colors.text, textAlign: 'center', marginBottom: theme.spacing.xs },
  subtitle: { fontSize: theme.fonts.sizes.sm, color: theme.colors.textLight, textAlign: 'center', marginBottom: theme.spacing.xl },
  form: { width: '100%' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: theme.spacing.xl },
  loginText: { color: theme.colors.textLight, fontSize: theme.fonts.sizes.sm },
  loginLink: { color: theme.colors.primary, fontSize: theme.fonts.sizes.sm, fontWeight: theme.fonts.weights.bold },
});

export default Register;
