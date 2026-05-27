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
    paddingTop: 58,
    paddingBottom: 120,
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
    height: 120,
    paddingTop: 14,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  categoryChip: {
    paddingHorizontal: 14,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginBottom: 8,
  },
  categoryActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontFamily: FONTS.bold,
    color: COLORS.muted,
    fontSize: 13,
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  imagePicker: {
    height: 190,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 22,
    overflow: "hidden",
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageIcon: {
    fontSize: 34,
    marginBottom: 8,
  },
  imageText: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: 14,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
});

export default styles;