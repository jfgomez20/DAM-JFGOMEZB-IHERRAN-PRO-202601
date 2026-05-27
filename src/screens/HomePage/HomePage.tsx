import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { InterestCategory, MainStackParamList } from "../../Routes";
import { useAppContext } from "../../context/AppContext";
import { Event } from "../../core/entities";
import { EventService, getCategoryLabel } from "../../core/services";
import styles from "./HomePageStyles";

const categories: { id: InterestCategory | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "academico", label: "Académico" },
  { id: "cultural", label: "Cultural" },
  { id: "deportivo", label: "Deportivo" },
  { id: "social", label: "Social" },
];

const HomePage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const { interests } = useAppContext();

  const [events, setEvents] = useState<Event[]>([]);
  const [activeFilter, setActiveFilter] =
    useState<InterestCategory | "todos">("todos");

  const loadEvents = () => {
    const loadedEvents = EventService.getAll();
    setEvents(loadedEvents);
  };

  useFocusEffect(
    useCallback(() => {
      loadEvents();
    }, [])
  );

  const featuredEvents = useMemo(() => {
    return events.filter((event) => event.featured === 1);
  }, [events]);

  const recommendedEvents = useMemo(() => {
    return events.filter((event) => interests.includes(event.category));
  }, [events, interests]);

  const nextEvents = useMemo(() => {
    if (activeFilter === "todos") {
      return events;
    }

    return events.filter((event) => event.category === activeFilter);
  }, [events, activeFilter]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hola 👋</Text>
        <Text style={styles.title}>Descubre eventos en EventosUB</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Destacados</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
        >
          {featuredEvents.map((event) => (
            <Pressable
              key={event.id}
              style={styles.featuredCard}
              onPress={() =>
                navigation.navigate("EventDetail", { eventId: event.id! })
              }
            >
              <Image source={{ uri: event.image }} style={styles.featuredImage} />

              <View style={styles.featuredOverlay}>
                <Text style={styles.featuredCategory}>
                  {getCategoryLabel(event.category).toUpperCase()}
                </Text>
                <Text style={styles.featuredTitle}>{event.title}</Text>
                <Text style={styles.featuredInfo}>
                  {event.date} · {event.location}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Recomendados para ti</Text>

        {recommendedEvents.length === 0 ? (
          <View style={styles.emptyRecommended}>
            <Text style={styles.emptyText}>
              Aún no tienes intereses seleccionados.
            </Text>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}
          >
            {recommendedEvents.map((event) => (
              <Pressable
                key={event.id}
                style={styles.smallRecommendedCard}
                onPress={() =>
                  navigation.navigate("EventDetail", { eventId: event.id! })
                }
              >
                <Image source={{ uri: event.image }} style={styles.smallImage} />
                <Text style={styles.smallCategory}>
                  {getCategoryLabel(event.category)}
                </Text>
                <Text numberOfLines={2} style={styles.smallTitle}>
                  {event.title}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        )}

        <Text style={styles.sectionTitle}>Próximos eventos</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {categories.map((category) => {
            const selected = activeFilter === category.id;

            return (
              <Pressable
                key={category.id}
                onPress={() => setActiveFilter(category.id)}
                style={[
                  styles.filterChip,
                  selected && styles.filterChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    selected && styles.filterTextActive,
                  ]}
                >
                  {category.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <FlatList
          data={nextEvents}
          keyExtractor={(item) => item.id!.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              style={styles.eventCard}
              onPress={() =>
                navigation.navigate("EventDetail", { eventId: item.id! })
              }
            >
              <Image source={{ uri: item.image }} style={styles.eventImage} />

              <View style={styles.eventInfo}>
                <Text style={styles.eventCategory}>
                  {getCategoryLabel(item.category).toUpperCase()}
                </Text>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventMeta}>
                  {item.date} · {item.location}
                </Text>
                <Text numberOfLines={2} style={styles.eventDescription}>
                  {item.description}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default HomePage;