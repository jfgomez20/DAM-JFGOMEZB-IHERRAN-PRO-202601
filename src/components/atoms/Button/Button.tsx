import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../../../styles/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label, onPress, variant = 'primary', loading = false, disabled = false, fullWidth = true,
}) => {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], fullWidth && styles.full, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}>
      {loading
        ? <ActivityIndicator color={variant === 'primary' ? '#fff' : theme.colors.primary} />
        : <Text style={[styles.label, variant !== 'primary' && styles.labelDark]}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: { paddingVertical: 14, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  full: { width: '100%' },
  primary: { backgroundColor: theme.colors.primary },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: theme.colors.primary },
  ghost: { backgroundColor: 'transparent' },
  disabled: { opacity: 0.5 },
  label: { color: '#fff', fontSize: theme.fonts.sizes.md, fontWeight: theme.fonts.weights.bold, letterSpacing: 0.5 },
  labelDark: { color: theme.colors.primary },
});

export default Button;
