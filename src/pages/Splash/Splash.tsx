import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { theme } from '../../styles/theme';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const Splash = () => {
  const navigation = useNavigation<NavProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Text style={styles.logoText}>EVENTOS</Text>
        <Text style={styles.logoSub}>UB</Text>
      </View>
      <Text style={styles.tagline}>Descubre todo lo que pasa en tu universidad</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center', paddingHorizontal: theme.spacing.xl },
  logoBox: { alignItems: 'center', marginBottom: theme.spacing.xl },
  logoText: { fontSize: theme.fonts.sizes.xxxl, fontWeight: theme.fonts.weights.extrabold, color: '#fff', letterSpacing: 2 },
  logoSub: { fontSize: theme.fonts.sizes.xxl, fontWeight: theme.fonts.weights.extrabold, color: '#fff', letterSpacing: 4 },
  tagline: { fontSize: theme.fonts.sizes.md, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 24 },
});

export default Splash;
