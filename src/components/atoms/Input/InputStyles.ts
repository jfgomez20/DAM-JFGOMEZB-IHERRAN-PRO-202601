import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../core/config";

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.input,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    fontFamily: FONTS.regular,
  },
  eye: {
    fontSize: 13,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginLeft: 10,
  },
});

export default styles;