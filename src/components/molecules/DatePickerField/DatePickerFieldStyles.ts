import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../core/config";

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontFamily: FONTS.bold,
    color: COLORS.text,
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    height: 54,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    fontFamily: FONTS.regular,
    color: COLORS.text,
    fontSize: 14,
  },
  placeholder: {
    color: "#B8A0A0",
  },
  calendarIcon: {
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  calendarCard: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 18,
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  navButton: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: 34,
    paddingHorizontal: 12,
  },
  monthTitle: {
    fontFamily: FONTS.bold,
    color: COLORS.text,
    fontSize: 19,
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekDay: {
    width: `${100 / 7}%`,
    textAlign: "center",
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: 13,
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: `${100 / 7}%`,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    marginBottom: 4,
  },
  dayCellSelected: {
    backgroundColor: COLORS.primary,
  },
  dayText: {
    fontFamily: FONTS.bold,
    color: COLORS.text,
    fontSize: 14,
  },
  dayTextSelected: {
    color: COLORS.white,
  },
  closeButton: {
    marginTop: 12,
    height: 46,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primaryLight,
  },
  closeText: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: 14,
  },
});

export default styles;