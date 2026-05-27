import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../core/config";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 58,
    paddingBottom: 110,
  },
  header: {
    marginBottom: 20,
  },
  pageTitle: {
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
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  unreadCard: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  icon: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    fontSize: 15,
    marginBottom: 5,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginLeft: 10,
  },
  message: {
    fontFamily: FONTS.regular,
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 8,
  },
  date: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: 11,
  },
  emptyBox: {
    backgroundColor: COLORS.white,
    borderRadius: 26,
    padding: 26,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyIcon: {
    fontSize: 38,
    marginBottom: 10,
  },
  emptyTitle: {
    fontFamily: FONTS.bold,
    color: COLORS.text,
    fontSize: 18,
    marginBottom: 6,
  },
  emptyText: {
    fontFamily: FONTS.regular,
    color: COLORS.muted,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
  },
});

export default styles;