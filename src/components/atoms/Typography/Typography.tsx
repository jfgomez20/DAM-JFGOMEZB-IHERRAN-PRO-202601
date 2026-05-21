import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { theme } from '../../../styles/theme';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  color?: string;
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body', color, align = 'left', children,
}) => {
  return (
    <Text style={[styles[variant], { color: color || styles[variant].color, textAlign: align }]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: { fontSize: theme.fonts.sizes.xxxl, fontWeight: theme.fonts.weights.extrabold, color: theme.colors.text },
  h2: { fontSize: theme.fonts.sizes.xxl, fontWeight: theme.fonts.weights.bold, color: theme.colors.text },
  h3: { fontSize: theme.fonts.sizes.xl, fontWeight: theme.fonts.weights.semibold, color: theme.colors.text },
  body: { fontSize: theme.fonts.sizes.md, fontWeight: theme.fonts.weights.regular, color: theme.colors.text },
  caption: { fontSize: theme.fonts.sizes.sm, fontWeight: theme.fonts.weights.regular, color: theme.colors.textLight },
  label: { fontSize: theme.fonts.sizes.xs, fontWeight: theme.fonts.weights.semibold, color: theme.colors.textLight, textTransform: 'uppercase', letterSpacing: 0.5 },
});

export default Typography;
