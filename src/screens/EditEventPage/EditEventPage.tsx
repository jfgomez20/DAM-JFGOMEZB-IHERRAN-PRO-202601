import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button } from "../../components/atoms";
import { DatePickerField } from "../../components/molecules";
import { MainStackParamList } from "../../Routes";
import { EventService } from "../../core/services";
import styles from "./EditEventPageStyles";

type EditEventRouteProp = RouteProp<MainStackParamList, "EditEvent">;

const EditEventPage = () => {
  const route = useRoute<EditEventRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const event = EventService.getById(route.params.eventId);

    if (!event) {
      Alert.alert("Error", "El evento no existe.");
      navigation.goBack();
      return;
    }

    setTitle(event.title);
    setDate(event.date);
    setLocation(event.location);
    setDescription(event.description);
  }, [route.params.eventId, navigation]);

  const handleUpdate = async () => {
    try {
      await EventService.update(route.params.eventId, {
        title,
        date,
        location,
        description,
      });

      Alert.alert("Evento actualizado", "Los cambios fueron guardados.");

      navigation.goBack();
    } catch (error: any) {
      Alert.alert(
        "No se pudo actualizar",
        error?.message || "Intenta nuevamente."
      );
    }
  };

  const isValid =
    title.trim() && date.trim() && location.trim() && description.trim();

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
        <Text style={styles.title}>Editar evento</Text>

        <Text style={styles.subtitle}>
          Solo puedes modificar los eventos que tú creaste.
        </Text>

        <Text style={styles.label}>Título</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Título del evento"
          placeholderTextColor="#B8A0A0"
          style={styles.input}
        />

        <DatePickerField
          label="Fecha"
          value={date}
          onChange={setDate}
        />

        <Text style={styles.label}>Ubicación</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="Ubicación"
          placeholderTextColor="#B8A0A0"
          style={styles.input}
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Descripción"
          placeholderTextColor="#B8A0A0"
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />

        <Button
          title="Guardar cambios"
          onPress={handleUpdate}
          disabled={!isValid}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditEventPage;