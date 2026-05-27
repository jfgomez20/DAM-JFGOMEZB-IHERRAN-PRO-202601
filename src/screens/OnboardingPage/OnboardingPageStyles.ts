import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../core/config";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 22,
    paddingTop: 62,
    paddingBottom: 28,
  },
  logo: {
    width: 110,
    height: 110,
    alignSelf: "center",
    marginBottom: 18,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 30,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  card: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 160,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  cardSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  emoji: {
    fontSize: 34,
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.text,
    marginBottom: 8,
  },
  cardTitleSelected: {
    color: COLORS.white,
  },
  cardDescription: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.muted,
    lineHeight: 17,
  },
  cardDescriptionSelected: {
    color: COLORS.white,
  },
});

export default styles;