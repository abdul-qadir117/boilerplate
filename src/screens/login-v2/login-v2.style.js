import { StyleSheet, Dimensions } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingBottom: 10,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "600",
    fontFamily: "DomaineDisplay",
    textAlign: "center",
  },
  briefing: {
    fontSize: 16,
    textAlign: "center",
  },
  formContainer: {
    paddingHorizontal: 51,
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  titleTopSpace: {
    height: 28,
  },
  titleBottomSpace: {
    height: 4,
  },
  breifingBottomSpace: {
    height: 15,
  },
  textInputSpace: {
    height: 5,
  },
  forgotPasswordTopSpace: {
    height: 10,
  },
  shapeLeft: {
    position: "absolute",
    left: 8,
    top: 67,
  },
  shapeRight: {
    position: "absolute",
    right: 0,
    top: 45,
  },
  shapeCircle: {
    position: "absolute",
    right: -20,
    bottom: -20,
  },
  formTopSpace: {
    height: 20,
  },
  image: {
    height: Math.floor(
      (Math.sqrt(screenHeight) / Math.sqrt(812)) * 100,
    ),
  },
  logo: {
    alignSelf: "center",
  },
  changeSchoolLinkContainer: {
    // marginLeft: 50,
  },
  topSpace: {
    flex: 2,
  },
  logoBottomSpace: {
    flex: 3,
  },
  schoolBottomSpace: {
    flex: 1,
  },
  emailInputTopSpace: {
    flex: 3,
  },
  passwordTopSpace: {
    flex: 1,
  },
  forgotPasswordBottomSpace: {
    flex: 1,
  },
  buttonSpace: {
    flex: 0.5,
  },
  bottomSpace: {
    flex: 10,
  },
  forgotPasswordContainer: {
    // marginLeft: 30,
  },
});

export default styles;
