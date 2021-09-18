import {StyleSheet, Dimensions} from 'react-native';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 10,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    // fontFamily: "DomaineDisplay",
    textAlign: 'center',
  },
  briefing: {
    fontSize: 16,
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: 51,
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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
  forgotPasswordBottomSpace: {
    height: 15,
  },
  buttonSpace: {
    height: 12,
  },
  shapeLeft: {
    position: 'absolute',
    left: 8,
    top: 67,
  },
  shapeRight: {
    position: 'absolute',
    right: 0,
    top: 45,
  },
  shapeCircle: {
    position: 'absolute',
    right: -20,
    bottom: -20,
  },
  formTopSpace: {
    height: 20,
  },
  image: {
    height: Math.floor((Math.sqrt(screenHeight) / Math.sqrt(812)) * 100),
  },
});

export default styles;
