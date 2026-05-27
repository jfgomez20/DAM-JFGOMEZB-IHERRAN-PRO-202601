import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button } from "../../components/atoms";
import { DatePickerField } from "../../components/molecules";
import { InterestCategory, MainStackParamList } from "../../Routes";
import { EventService } from "../../core/services";
import styles from "./CreateEventPageStyles";

const categories: { id: InterestCategory; label: string; emoji: string }[] = [
  { id: "academico", label: "Académico", emoji: "🎓" },
  { id: "cultural", label: "Cultural", emoji: "🎭" },
  { id: "deportivo", label: "Deportivo", emoji: "⚽" },
  { id: "social", label: "Social", emoji: "🤝" },
];

const CreateEventPage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<InterestCategory>("academico");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.8,
      selectionLimit: 1,
    });

    if (result.didCancel) {
      return;
    }

    if (result.errorMessage) {
      Alert.alert("Error", result.errorMessage);
      return;
    }

    const uri = result.assets?.[0]?.uri;

    if (uri) {
      setImage(uri);
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategory("academico");
    setDate("");
    setLocation("");
    setDescription("");
    setImage("");
  };

  const handleCreate = async () => {
    try {
      const event = await EventService.create({
        title,
        category,
        date,
        location,
        description,
        image,
      });

      Alert.alert("Evento creado", "El evento se guardó correctamente.");

      resetForm();

      navigation.navigate("EventDetail", {
        eventId: event.id!,
      });
    } catch (error: any) {
      Alert.alert(
        "No se pudo crear el evento",
        error?.message || "Intenta nuevamente."
      );
    }
  };

  const isValid =
    title.trim() &&
    date.trim() &&
    location.trim() &&
    description.trim() &&
    image.trim();

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Crear evento</Text>
        <Text style={styles.subtitle}>
          Publica una actividad para que otros estudiantes puedan descubrirla.
        </Text>

        <Text style={styles.label}>Título</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Ej: Taller de fotografía"
          placeholderTextColor="#B8A0A0"
          style={styles.input}
        />

        <Text style={styles.label}>Categoría</Text>

        <View style={styles.categories}>
          {categories.map((item) => {
            const selected = category === item.id;

            return (
              <Pressable
                key={item.id}
                onPress={() => setCategory(item.id)}
                style={[styles.categoryChip, selected && styles.categoryActive]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selected && styles.categoryTextActive,
                  ]}
                >
                  {item.emoji} {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <DatePickerField
          label="Fecha"
          value={date}
          onChange={setDate}
        />

        <Text style={styles.label}>Ubicación</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="Ej: Auditorio principal"
          placeholderTextColor="#B8A0A0"
          style={styles.input}
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Describe el evento"
          placeholderTextColor="#B8A0A0"
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Imagen</Text>

        <Pressable style={styles.imagePicker} onPress={handlePickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imageIcon}>🖼️</Text>
              <Text style={styles.imageText}>
                Seleccionar imagen desde galería
              </Text>
            </View>
          )}
        </Pressable>

        <Button
          title="Crear evento"
          onPress={handleCreate}
          disabled={!isValid}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateEventPage;