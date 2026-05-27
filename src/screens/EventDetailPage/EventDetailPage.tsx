import React, { useCallback, useState } from "react";
import { Alert, Image, ScrollView, Share, Text, View } from "react-native";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { MainStackParamList } from "../../Routes";
import { Button } from "../../components/atoms";
import { useAppContext } from "../../context/AppContext";
import { Event } from "../../core/entities";
import { AuthService, EventService, getCategoryLabel } from "../../core/services";
import styles from "./EventDetailPageStyles";

type EventDetailRouteProp = RouteProp<MainStackParamList, "EventDetail">;

const EventDetailPage = () => {
  const route = useRoute<EventDetailRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const {
    saveEvent,
    removeSavedEvent,
    isEventSaved,
    confirmAttendance,
    isAttendanceConfirmed,
  } = useAppContext();

  const [event, setEvent] = useState<Event | null>(null);
  const [canEdit, setCanEdit] = useState(false);

  const loadEvent = async () => {
    const loadedEvent = EventService.getById(route.params.eventId);
    setEvent(loadedEvent);

    const session = await AuthService.getSession();

    if (loadedEvent?.createdByUserId && session?.id) {
      setCanEdit(loadedEvent.createdByUserId === session.id);
    } else {
      setCanEdit(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadEvent();
    }, [route.params.eventId])
  );

  if (!event) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Evento no encontrado</Text>
      </View>
    );
  }

  const saved = isEventSaved(event.id!);
  const attendanceConfirmed = isAttendanceConfirmed(event.id!);

  const handleSave = async () => {
    if (saved) {
      await removeSavedEvent(event.id!);
      Alert.alert("Evento eliminado", "Se quitó de tus eventos guardados.");
      return;
    }

    await saveEvent(event.id!);
    Alert.alert("Evento guardado", "Podrás verlo después en tu perfil.");
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: event.title,
        message:
          `Mira este evento en EventosUB:\n\n` +
          `${event.title}\n` +
          `Fecha: ${event.date}\n` +
          `Lugar: ${event.location}\n\n` +
          `${event.description}`,
      });
    } catch (error) {
      Alert.alert("No se pudo compartir", "Intenta nuevamente.");
    }
  };

  const handleConfirmAttendance = async () => {
    await confirmAttendance(event.id!);
    await saveEvent(event.id!);

    navigation.navigate("AttendanceSuccess", {
      eventId: event.id!,
    });
  };

  const handleEdit = () => {
    navigation.navigate("EditEvent", {
      eventId: event.id!,
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Borrar evento",
      "¿Seguro que quieres borrar este evento? Esta acción no se puede deshacer.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Borrar",
          style: "destructive",
          onPress: async () => {
            try {
              await EventService.delete(event.id!);
              await removeSavedEvent(event.id!);

              Alert.alert("Evento borrado", "El evento fue eliminado.");
              navigation.goBack();
            } catch (error: any) {
              Alert.alert(
                "No se pudo borrar",
                error?.message || "Intenta nuevamente."
              );
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Image source={{ uri: event.image }} style={styles.heroImage} />

      <View style={styles.body}>
        <Text style={styles.category}>
          {getCategoryLabel(event.category).toUpperCase()}
        </Text>

        <Text style={styles.title}>{event.title}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Fecha</Text>
          <Text style={styles.infoValue}>{event.date}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Lugar</Text>
          <Text style={styles.infoValue}>{event.location}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Organizador</Text>
          <Text style={styles.infoValue}>{event.organizer}</Text>
        </View>

        <Text style={styles.descriptionTitle}>Descripción</Text>
        <Text style={styles.description}>{event.description}</Text>

        <View style={styles.actions}>
          {canEdit && (
            <>
              <Button title="Editar evento" onPress={handleEdit} />
              <View style={styles.space} />

              <Button title="Borrar evento" variant="ghost" onPress={handleDelete} />
              <View style={styles.space} />
            </>
          )}

          <Button
            title={saved ? "Quitar de guardados" : "Guardar evento"}
            onPress={handleSave}
            variant={saved ? "ghost" : "primary"}
          />

          <View style={styles.space} />

          <Button title="Compartir" variant="ghost" onPress={handleShare} />

          <View style={styles.space} />

          <Button
            title={
              attendanceConfirmed
                ? "Asistencia confirmada"
                : "Confirmar asistencia"
            }
            onPress={handleConfirmAttendance}
            disabled={attendanceConfirmed}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EventDetailPage;