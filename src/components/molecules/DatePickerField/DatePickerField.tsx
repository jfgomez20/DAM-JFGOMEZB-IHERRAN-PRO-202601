import React, { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./DatePickerFieldStyles";

interface DatePickerFieldProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
}

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const weekDays = ["D", "L", "M", "M", "J", "V", "S"];

const formatDate = (year: number, month: number, day: number) => {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");

  return `${year}-${mm}-${dd}`;
};

const DatePickerField = ({ label, value, onChange }: DatePickerFieldProps) => {
  const today = new Date();

  const [visible, setVisible] = useState(false);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const blanks = Array.from({ length: firstDay }, () => null);
    const monthDays = Array.from({ length: totalDays }, (_, index) => index + 1);

    return [...blanks, ...monthDays];
  }, [year, month]);

  const goPreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((current) => current - 1);
      return;
    }

    setMonth((current) => current - 1);
  };

  const goNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((current) => current + 1);
      return;
    }

    setMonth((current) => current + 1);
  };

  const handleSelectDay = (day: number) => {
    onChange(formatDate(year, month, day));
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.input} onPress={() => setVisible(true)}>
        <Text style={[styles.inputText, !value && styles.placeholder]}>
          {value || "Seleccionar fecha"}
        </Text>
        <Text style={styles.calendarIcon}>📅</Text>
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarCard}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={goPreviousMonth}>
                <Text style={styles.navButton}>‹</Text>
              </TouchableOpacity>

              <Text style={styles.monthTitle}>
                {monthNames[month]} {year}
              </Text>

              <TouchableOpacity onPress={goNextMonth}>
                <Text style={styles.navButton}>›</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.weekRow}>
              {weekDays.map((day, index) => (
                <Text key={`${day}-${index}`} style={styles.weekDay}>
                  {day}
                </Text>
              ))}
            </View>

            <View style={styles.daysGrid}>
              {days.map((day, index) => {
                if (day === null) {
                  return <View key={`empty-${index}`} style={styles.dayCell} />;
                }

                const currentDate = formatDate(year, month, day);
                const selected = value === currentDate;

                return (
                  <Pressable
                    key={currentDate}
                    style={[
                      styles.dayCell,
                      selected && styles.dayCellSelected,
                    ]}
                    onPress={() => handleSelectDay(day)}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        selected && styles.dayTextSelected,
                      ]}
                    >
                      {day}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.closeText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DatePickerField;