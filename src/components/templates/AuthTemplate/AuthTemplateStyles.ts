import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../core/config";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 54,
    paddingBottom: 30,
    justifyContent: "center",
  },
  hero: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoCircle: {
    width: 112,
    height: 112,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  logo: {
    width: 96,
    height: 96,
  },
  appName: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: FONTS.bold,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    color: COLORS.text,
    fontFamily: FONTS.bold,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.muted,
    fontFamily: FONTS.regular,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
    maxWidth: 320,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 32,
    padding: 24,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
});

export default styles;