import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../core/config";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  logoContainer: {
    width: 250,
    height: 250,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 26,
    elevation: 10,
  },
  logo: {
    width: 220,
    height: 220,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 36,
    color: COLORS.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 310,
  },
});

export default styles;