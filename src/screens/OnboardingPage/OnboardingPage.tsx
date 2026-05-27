import React, { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/atoms";
import { InterestCategory, RootStackParamList } from "../../Routes";
import { useAppContext } from "../../context/AppContext";
import styles from "./OnboardingPageStyles";

const logo = require("../../assets/images/logoEventosUB.png");

interface InterestOption {
  id: InterestCategory;
  title: string;
  emoji: string;
  description: string;
}

const options: InterestOption[] = [
  {
    id: "academico",
    title: "Académico",
    emoji: "🎓",
    description: "Charlas, ferias, talleres y conferencias.",
  },
  {
    id: "cultural",
    title: "Cultural",
    emoji: "🎭",
    description: "Conciertos, arte, teatro y actividades creativas.",
  },
  {
    id: "deportivo",
    title: "Deportivo",
    emoji: "⚽",
    description: "Torneos, entrenamientos y actividades físicas.",
  },
  {
    id: "social",
    title: "Social",
    emoji: "🤝",
    description: "Integraciones, encuentros y espacios estudiantiles.",
  },
];

const OnboardingPage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { setUserInterests } = useAppContext();

  const [selected, setSelected] = useState<InterestCategory[]>([]);

  const toggleInterest = (id: InterestCategory) => {
    setSelected((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  };

  const handleContinue = async () => {
    if (selected.length === 0) {
      Alert.alert(
        "Selecciona al menos una opción",
        "Elige mínimo un interés para poder recomendarte eventos."
      );
      return;
    }

    await setUserInterests(selected);

    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>Elige tus intereses</Text>

      <Text style={styles.subtitle}>
        Te mostraremos recomendados según lo que selecciones, pero podrás filtrar
        por cualquier categoría cuando quieras.
      </Text>

      <View style={styles.grid}>
        {options.map((option) => {
          const isSelected = selected.includes(option.id);

          return (
            <Pressable
              key={option.id}
              onPress={() => toggleInterest(option.id)}
              style={[
                styles.card,
                isSelected && styles.cardSelected,
              ]}
            >
              <Text style={styles.emoji}>{option.emoji}</Text>

              <Text
                style={[
                  styles.cardTitle,
                  isSelected && styles.cardTitleSelected,
                ]}
              >
                {option.title}
              </Text>

              <Text
                style={[
                  styles.cardDescription,
                  isSelected && styles.cardDescriptionSelected,
                ]}
              >
                {option.description}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Button
        title="Continuar"
        onPress={handleContinue}
        disabled={selected.length === 0}
      />
    </View>
  );
};

export default OnboardingPage;