import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../core/config";

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 34,
    paddingBottom: 80,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 30,
    color: COLORS.text,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.muted,
    lineHeight: 22,
    marginBottom: 24,
  },
  label: {
    fontFamily: FONTS.bold,
    color: COLORS.text,
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    minHeight: 54,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    fontFamily: FONTS.regular,
    color: COLORS.text,
    fontSize: 14,
    marginBottom: 16,
  },
  textArea: {
    height: 130,
    paddingTop: 14,
  },
});

export default styles;