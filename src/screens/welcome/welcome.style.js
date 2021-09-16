import { StyleSheet, Dimensions } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  logoTopSpace: {
    flex: 1,
  },
  titleTopSpace: {
    flex: 1,
  },
  titleBottomSpace: {
    flex: 1,
  },
  imageBottomSpace: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "600",
    fontFamily: "DomaineDisplay",
    textAlign: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -60,
  },
  contentContainer: {},
  shapeLeft: {
    position: "absolute",
    left: 8,
    top: 137,
  },
  shapeRight: {
    position: "absolute",
    right: 0,
    top: 95,
  },
  container: {
    padding: 16,
  },
  bottomSpace: {
    flex: 8,
  },
  inputContainer: {
    paddingHorizontal: 16,
    zIndex: 10,
  },
  logo: {
    alignSelf: "center",
  },
  shapeCircle: {
    position: "absolute",
    left: -30,
    bottom: 67,
  },
});

export default styles;
