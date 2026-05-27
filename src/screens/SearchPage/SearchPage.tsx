import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { InterestCategory, MainStackParamList } from "../../Routes";
import { Event } from "../../core/entities";
import { EventService, getCategoryLabel } from "../../core/services";
import { DatePickerField } from "../../components/molecules";
import styles from "./SearchPageStyles";

const categories: { id: InterestCategory | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "academico", label: "Académico" },
  { id: "cultural", label: "Cultural" },
  { id: "deportivo", label: "Deportivo" },
  { id: "social", label: "Social" },
];

const SearchPage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const [events, setEvents] = useState<Event[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<InterestCategory | "todos">("todos");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");

  useFocusEffect(
    useCallback(() => {
      setEvents(EventService.getAll());
    }, [])
  );

  const filteredEvents = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    const cleanLocation = location.trim().toLowerCase();

    return events.filter((event) => {
      const matchesTitle =
        !cleanQuery || event.title.toLowerCase().includes(cleanQuery);

      const matchesCategory =
        category === "todos" || event.category === category;

      const matchesLocation =
        !cleanLocation || event.location.toLowerCase().includes(cleanLocation);

      const matchesStartDate = !startDate || event.date >= startDate;

      const matchesEndDate = !endDate || event.date <= endDate;

      return (
        matchesTitle &&
        matchesCategory &&
        matchesLocation &&
        matchesStartDate &&
        matchesEndDate
      );
    });
  }, [events, query, category, startDate, endDate, location]);

  const clearDateRange = () => {
    setStartDate("");
    setEndDate("");
  };

  const clearAllFilters = () => {
    setQuery("");
    setCategory("todos");
    setStartDate("");
    setEndDate("");
    setLocation("");
  };

  const hasFilters =
    query.trim() ||
    category !== "todos" ||
    startDate ||
    endDate ||
    location.trim();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Buscar eventos</Text>
        <Text style={styles.subtitle}>
          Encuentra eventos por título, categoría, rango de fecha o ubicación.
        </Text>
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id!.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>🔎</Text>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Buscar por título del evento"
                placeholderTextColor="#B8A0A0"
                style={styles.searchInput}
              />
            </View>

            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder="Filtrar por ubicación"
              placeholderTextColor="#B8A0A0"
              style={styles.locationInput}
            />

            <Text style={styles.filterTitle}>Categoría</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsRow}
            >
              {categories.map((item) => {
                const selected = category === item.id;

                return (
                  <Pressable
                    key={item.id}
                    onPress={() => setCategory(item.id)}
                    style={[styles.chip, selected && styles.chipActive]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        selected && styles.chipTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <Text style={styles.filterTitle}>Rango de fecha</Text>

            <View style={styles.dateRangeBox}>
              <DatePickerField
                label="Desde"
                value={startDate}
                onChange={setStartDate}
              />

              <DatePickerField
                label="Hasta"
                value={endDate}
                onChange={setEndDate}
              />

              {(startDate || endDate) && (
                <Pressable style={styles.clearDateButton} onPress={clearDateRange}>
                  <Text style={styles.clearDateText}>Limpiar rango de fecha</Text>
                </Pressable>
              )}
            </View>

            {hasFilters && (
              <Pressable style={styles.clearAllButton} onPress={clearAllFilters}>
                <Text style={styles.clearAllText}>Limpiar todos los filtros</Text>
              </Pressable>
            )}

            <Text style={styles.resultsText}>
              {filteredEvents.length} evento(s) encontrado(s)
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No encontramos eventos</Text>
            <Text style={styles.emptyText}>
              Intenta cambiar el título buscado o ajustar los filtros.
            </Text>
          </View>
        }
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
    </View>
  );
};

export default SearchPage;