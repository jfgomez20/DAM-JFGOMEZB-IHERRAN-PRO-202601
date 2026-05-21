import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../styles/theme';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label, placeholder, value, onChangeText, secureTextEntry = false, keyboardType = 'default', error,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputBox, error && styles.inputError]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !visible}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.eye}>
            <Text style={styles.eyeText}>{visible ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: theme.spacing.md },
  label: { fontSize: theme.fonts.sizes.sm, fontWeight: theme.fonts.weights.semibold, color: theme.colors.textLight, marginBottom: theme.spacing.xs },
  inputBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.inputBorder, borderRadius: 8, backgroundColor: theme.colors.inputBackground, paddingHorizontal: 12 },
  inputError: { borderColor: theme.colors.error },
  input: { flex: 1, height: 50, fontSize: theme.fonts.sizes.md, color: theme.colors.text },
  eye: { padding: 4 },
  eyeText: { fontSize: 16 },
  error: { fontSize: theme.fonts.sizes.xs, color: theme.colors.error, marginTop: 4 },
});

export default Input;
