import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../core/config";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 58,
    paddingBottom: 14,
  },
  greeting: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.muted,
    marginBottom: 6,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.text,
    lineHeight: 34,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.text,
    marginHorizontal: 22,
    marginTop: 18,
    marginBottom: 12,
  },
  carousel: {
    paddingLeft: 22,
    paddingRight: 8,
  },
  featuredCard: {
    width: 285,
    height: 190,
    borderRadius: 28,
    overflow: "hidden",
    marginRight: 16,
    backgroundColor: COLORS.white,
  },
  featuredImage: {
    width: "100%",
    height: "100%",
  },
  featuredOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.52)",
  },
  featuredCategory: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
    fontSize: 11,
    marginBottom: 5,
  },
  featuredTitle: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
    fontSize: 18,
    marginBottom: 5,
  },
  featuredInfo: {
    fontFamily: FONTS.regular,
    color: COLORS.white,
    fontSize: 12,
  },
  smallRecommendedCard: {
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  smallImage: {
    width: "100%",
    height: 90,
    borderRadius: 16,
    marginBottom: 10,
  },
  smallCategory: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: 11,
    marginBottom: 4,
  },
  smallTitle: {
    fontFamily: FONTS.bold,
    color: COLORS.text,
    fontSize: 13,
    lineHeight: 17,
  },
  filters: {
    paddingHorizontal: 22,
    paddingBottom: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontFamily: FONTS.bold,
    color: COLORS.muted,
    fontSize: 13,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  list: {
    paddingHorizontal: 22,
    paddingBottom: 110,
  },
  eventCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  eventImage: {
    width: 92,
    height: 92,
    borderRadius: 18,
    marginRight: 14,
  },
  eventInfo: {
    flex: 1,
  },
  eventCategory: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: 10,
    marginBottom: 5,
  },
  eventTitle: {
    fontFamily: FONTS.bold,
    color: COLORS.text,
    fontSize: 15,
    marginBottom: 5,
  },
  eventMeta: {
    fontFamily: FONTS.regular,
    color: COLORS.muted,
    fontSize: 12,
    marginBottom: 5,
  },
  eventDescription: {
    fontFamily: FONTS.regular,
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  emptyRecommended: {
    marginHorizontal: 22,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyText: {
    fontFamily: FONTS.regular,
    color: COLORS.muted,
    fontSize: 14,
  },
});

export default styles;