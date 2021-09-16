import { StyleSheet } from "react-native";
import { COLOR } from "@config";

const styles = StyleSheet.create({
  container: {},
  errorContainer: {
    borderColor: COLOR.TEXT_INPUT_ERROR,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: COLOR.TEXT_INPUT_LABEL,
    marginBottom: 10,
  },
  inputContainer: {
    height: 42,
    backgroundColor: COLOR.TEXT_INPUT_BACKGROUND,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR.TEXT_INPUT_BORDER,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  input: {
    fontSize: 14,
    fontFamily: "Lato",
    color: COLOR.TEXT_INPUT_VALUE,
    flex: 1,
  },
  errorMessage: {
    color: COLOR.TEXT_INPUT_ERROR,
    fontSize: 12,
  },
  errorMessageContainer: {
    height: 15,
    justifyContent: "center",
  },
});

export default styles;
