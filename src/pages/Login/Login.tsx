import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { theme } from '../../styles/theme';
import Input from '../../components/atoms/Input/Input';
import Button from '../../components/atoms/Button/Button';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<NavProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    navigation.replace('Interests');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        <View style={styles.logoBox}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>EVENTOS{'\n'}UB</Text>
          </View>
        </View>

        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Descubre todo lo que pasa en tu universidad</Text>

        <View style={styles.form}>
          <Input
            placeholder="Correo institucional"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.forgot}>
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          <Button label="Iniciar Sesión" onPress={handleLogin} />
        </View>

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  scroll: { flexGrow: 1, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.xl },
  logoBox: { alignItems: 'center', marginBottom: theme.spacing.lg },
  logoCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center' },
  logoText: { color: '#fff', fontWeight: theme.fonts.weights.extrabold, fontSize: theme.fonts.sizes.sm, textAlign: 'center', letterSpacing: 1 },
  title: { fontSize: theme.fonts.sizes.xxl, fontWeight: theme.fonts.weights.bold, color: theme.colors.text, textAlign: 'center', marginBottom: theme.spacing.xs },
  subtitle: { fontSize: theme.fonts.sizes.sm, color: theme.colors.textLight, textAlign: 'center', marginBottom: theme.spacing.xl },
  form: { width: '100%' },
  forgot: { alignSelf: 'flex-end', marginBottom: theme.spacing.md, marginTop: -theme.spacing.sm },
  forgotText: { color: theme.colors.primary, fontSize: theme.fonts.sizes.sm },
  registerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: theme.spacing.xl },
  registerText: { color: theme.colors.textLight, fontSize: theme.fonts.sizes.sm },
  registerLink: { color: theme.colors.primary, fontSize: theme.fonts.sizes.sm, fontWeight: theme.fonts.weights.bold },
});

export default Login;
