import { StyleSheet } from "react-native";
import { COLOR } from "@config";

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  invertedPrimaryContainer: {},
  primaryContainer: {
    backgroundColor: COLOR.BUTTON_PRIMARY_BACKGROUND,
  },
  secondaryHollowContainer: {
    borderColor: COLOR.BUTTON_HOLLOW_SECONDARY_BORDERS,
    backgroundColor: COLOR.BUTTON_HOLLOW_SECONDARY_BACKGROUND,
    borderWidth: 1,
  },
  primaryHollowContainer: {
    borderColor: COLOR.BUTTON_HOLLOW_PRIMARY_BORDERS,
    backgroundColor: COLOR.BUTTON_HOLLOW_PRIMARY_BACKGROUND,
    borderWidth: 1,
  },
  googleLoginContainer: {
    borderColor: COLOR.BUTTON_GOOGLE_LOGIN_BORDERS,
    backgroundColor: COLOR.BUTTON_GOOGLE_LOGIN_BACKGROUND,
    borderWidth: 1,
  },
  invertedPrimaryText: {
    color: COLOR.BUTTON_PRIMARY_BACKGROUND,
  },
  primaryText: {
    backgroundColor: COLOR.BUTTON_PRIMARY_TEXT,
  },
  title: {
    fontWeight: "700",
    fontSize: 14,
  },
  primaryTitle: {
    fontWeight: "700",
    color: COLOR.BUTTON_PRIMARY_TITLE,
  },
  primaryHollowTitle: {
    fontWeight: "700",
    color: COLOR.BUTTON_HOLLOW_PRIMARY_TITLE,
  },
  googleLoginTitle: {
    fontWeight: "700",
    color: COLOR.BUTTON_GOOGLE_LOGIN_TTILE,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 5,
  },
  badgeContainer: {
    backgroundColor: COLOR.BUTTON_HOLLOW_BADGE_BACKGROUND,
    height: 23,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  badgeText: {
    color: COLOR.BUTTON_HOLLOW_BADGE_TEXT,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default styles;
