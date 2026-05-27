import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../core/config";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
});

export default styles;