import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../core/config";

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: COLORS.text,
    fontFamily: FONTS.bold,
    marginBottom: 8,
    marginLeft: 4,
  },
});

export default styles;