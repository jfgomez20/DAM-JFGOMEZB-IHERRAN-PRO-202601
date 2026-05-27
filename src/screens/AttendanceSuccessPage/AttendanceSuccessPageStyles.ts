import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../core/config";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 22,
    paddingTop: 54,
    paddingBottom: 28,
  },
  successCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.26,
    shadowRadius: 18,
    elevation: 8,
  },
  check: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 44,
  },
  title: {
    fontFamily: FONTS.bold,
    color: COLORS.text,
    fontSize: 30,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    color: COLORS.muted,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 22,
    marginBottom: 16,
  },
  category: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: 12,
    marginBottom: 6,
  },
  eventTitle: {
    fontFamily: FONTS.bold,
    color: COLORS.text,
    fontSize: 22,
    lineHeight: 28,
    marginBottom: 12,
  },
  meta: {
    fontFamily: FONTS.regular,
    color: COLORS.muted,
    fontSize: 14,
    marginBottom: 5,
  },
  space: {
    height: 12,
  },
});

export default styles;