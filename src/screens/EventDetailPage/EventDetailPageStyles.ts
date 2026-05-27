import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../core/config";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingBottom: 40,
  },
  heroImage: {
    width: "100%",
    height: 310,
  },
  body: {
    marginTop: -26,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingHorizontal: 22,
    paddingTop: 26,
  },
  category: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: 12,
    marginBottom: 8,
  },
  title: {
    fontFamily: FONTS.bold,
    color: COLORS.text,
    fontSize: 30,
    lineHeight: 36,
    marginBottom: 18,
  },
  infoBox: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
  },
  infoLabel: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: FONTS.regular,
    color: COLORS.text,
    fontSize: 15,
  },
  descriptionTitle: {
    fontFamily: FONTS.bold,
    color: COLORS.text,
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontFamily: FONTS.regular,
    color: COLORS.muted,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 24,
  },
  actions: {
    marginBottom: 20,
  },
  space: {
    height: 12,
  },
  notFound: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundText: {
    fontFamily: FONTS.bold,
    color: COLORS.text,
    fontSize: 18,
  },
});

export default styles;