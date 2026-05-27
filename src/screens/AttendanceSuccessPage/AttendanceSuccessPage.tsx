import React from "react";
import { Alert, Image, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button } from "../../components/atoms";
import { MainStackParamList } from "../../Routes";
import { CalendarNative } from "../../core/native/CalendarNative";
import { EventService, getCategoryLabel } from "../../core/services";
import styles from "./AttendanceSuccessPageStyles";

type AttendanceSuccessRouteProp = RouteProp<
  MainStackParamList,
  "AttendanceSuccess"
>;

const AttendanceSuccessPage = () => {
  const route = useRoute<AttendanceSuccessRouteProp>();

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const event = EventService.getById(route.params.eventId);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Evento no encontrado</Text>
      </View>
    );
  }

  const handleAddToCalendar = async () => {
    try {
      await CalendarNative.addEvent({
        title: event.title,
        location: event.location,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
      });
    } catch (error: any) {
      Alert.alert(
        "No se pudo abrir el calendario",
        error?.message || "Intenta nuevamente."
      );
    }
  };

  const handleGoHome = () => {
    navigation.navigate("Tabs");
  };

  return (
    <View style={styles.container}>
      <View style={styles.successCircle}>
        <Text style={styles.check}>✓</Text>
      </View>

      <Text style={styles.title}>¡Asistencia confirmada!</Text>

      <Text style={styles.subtitle}>
        Ya guardamos este evento en tu perfil. También puedes añadirlo al
        calendario de tu dispositivo.
      </Text>

      <View style={styles.card}>
        <Image source={{ uri: event.image }} style={styles.image} />

        <Text style={styles.category}>
          {getCategoryLabel(event.category).toUpperCase()}
        </Text>

        <Text style={styles.eventTitle}>{event.title}</Text>

        <Text style={styles.meta}>Fecha: {event.date}</Text>
        <Text style={styles.meta}>Lugar: {event.location}</Text>
        <Text style={styles.meta}>Organizador: {event.organizer}</Text>
      </View>

      <Button title="Agregar al calendario" onPress={handleAddToCalendar} />

      <View style={styles.space} />

      <Button title="Volver al inicio" variant="ghost" onPress={handleGoHome} />
    </View>
  );
};

export default AttendanceSuccessPage;