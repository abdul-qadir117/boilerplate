import { StyleSheet } from "react-native";
import { COLOR } from "@config";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    // paddingBottom: 10,
  },
  topSpace: {
    height: 27,
  },
  shadow: {
    elevation: 5,
    shadowOpacity: 0.1,
    shadowOffset: { height: 4 },
    zIndex: 10,
  },
  leftIcon: {
    marginLeft: 16,
  },
  title: {
    fontFamily: "Lato",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 15,
    color: COLOR.HEADER_TITLE,
    marginLeft: 16,
  },
  searchBarContainer: {
    padding: 16,
    paddingBottom: 15,
    fontSize: 14,
    fontFamily: "Lato",
    flexDirection: "row",
    backgroundColor: 'blue',
  },
  searchBarRightButtons: {
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  searchInputContainer: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 28,
    backgroundColor: 'white'
  },
  smallTitle: {
    color: "#373737",
    fontSize: 18,
    fontFamily: "Lato",
    fontWeight: "700",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonsSpace: {
    flex: 1,
  },
  rightButtonContainer: {
    marginRight: 16,
  },
});

export default styles;
