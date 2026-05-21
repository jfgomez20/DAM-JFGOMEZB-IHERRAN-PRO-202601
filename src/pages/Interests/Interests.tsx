import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { theme } from '../../styles/theme';
import Button from '../../components/atoms/Button/Button';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Interests'>;

const CATEGORIES = [
  { id: 'academic', label: 'Académico', emoji: '📚', color: theme.colors.academic },
  { id: 'cultural', label: 'Cultural', emoji: '🎨', color: theme.colors.cultural },
  { id: 'sport', label: 'Deportivo', emoji: '⚽', color: theme.colors.sport },
  { id: 'social', label: 'Social', emoji: '🎉', color: theme.colors.social },
];

const Interests = () => {
  const navigation = useNavigation<NavProp>();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>¿Qué te{'\n'}interesa?</Text>

        <View style={styles.grid}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.card, { backgroundColor: cat.color }, selected.includes(cat.id) && styles.selected]}
              onPress={() => toggle(cat.id)}
              activeOpacity={0.8}>
              <Text style={styles.emoji}>{cat.emoji}</Text>
              <Text style={styles.cardLabel}>{cat.label}</Text>
              {selected.includes(cat.id) && <Text style={styles.check}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>

        <Button
          label="Continuar"
          onPress={() => navigation.replace('Home')}
          disabled={selected.length === 0}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  container: { flex: 1, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.xl, justifyContent: 'space-between', paddingBottom: theme.spacing.xl },
  title: { fontSize: theme.fonts.sizes.xxxl, fontWeight: theme.fonts.weights.extrabold, color: theme.colors.text, marginBottom: theme.spacing.xl },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md, justifyContent: 'center', flex: 1, alignContent: 'center' },
  card: { width: '45%', aspectRatio: 1, borderRadius: 16, justifyContent: 'center', alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4 },
  selected: { borderWidth: 3, borderColor: '#fff' },
  emoji: { fontSize: 40, marginBottom: theme.spacing.sm },
  cardLabel: { color: '#fff', fontSize: theme.fonts.sizes.lg, fontWeight: theme.fonts.weights.bold },
  check: { position: 'absolute', top: 10, right: 14, color: '#fff', fontSize: 20, fontWeight: theme.fonts.weights.extrabold },
});

export default Interests;
