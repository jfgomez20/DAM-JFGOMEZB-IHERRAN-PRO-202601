import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../core/config";

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  primary: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 6,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  disabled: {
    opacity: 0.55,
  },
  text: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: FONTS.bold,
    letterSpacing: 0.3,
  },
  ghostText: {
    color: COLORS.primary,
  },
});

export default styles;