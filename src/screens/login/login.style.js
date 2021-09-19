import {StyleSheet, Dimensions} from 'react-native';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: '50%',
    width: '100%',
  },
  headerContainerImage: {
    height: 750,
    width: '100%',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginLeft: 30,
    textShadowColor: 'black',
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  formContainer: {
    height: '50%',
    alignItems: 'center',
  },
  inputField: {
    width: '90%',
    height: 50,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    marginVertical: 20,
  },
  signInText: {
    fontSize: 26,
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  nextButtonContainer: {
    alignItems: 'flex-end',
  },
  nextButton: {
    backgroundColor: 'darkred',
    width: 100,
    borderRadius: 50,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgetPassword: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
    textDecorationLine: 'underline',
    marginVertical: 20,
  },
});

export default styles;

//asasdasdasdasdasddasdasd

// import {StyleSheet, Dimensions} from 'react-native';
// const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   contentContainer: {
//     paddingBottom: 10,
//   },
//   welcomeTitle: {
//     fontSize: 32,
//     fontWeight: '600',
//     color: 'white',
//     // fontFamily: "DomaineDisplay",
//     textAlign: 'center',
//   },
//   briefing: {
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   formContainer: {
//     paddingHorizontal: 51,
//     paddingBottom: 20,
//   },
//   imageContainer: {
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center',
//   },
//   titleTopSpace: {
//     height: 28,
//   },
//   titleBottomSpace: {
//     height: 4,
//   },
//   breifingBottomSpace: {
//     height: 15,
//   },
//   textInputSpace: {
//     height: 5,
//   },
//   forgotPasswordTopSpace: {
//     height: 10,
//   },
//   forgotPasswordBottomSpace: {
//     height: 15,
//   },
//   buttonSpace: {
//     height: 12,
//   },
//   shapeLeft: {
//     position: 'absolute',
//     left: 8,
//     top: 67,
//   },
//   shapeRight: {
//     position: 'absolute',
//     right: 0,
//     top: 45,
//   },
//   shapeCircle: {
//     position: 'absolute',
//     right: -20,
//     bottom: -20,
//   },
//   formTopSpace: {
//     height: 20,
//   },
//   image: {
//     height: Math.floor((Math.sqrt(screenHeight) / Math.sqrt(812)) * 100),
//   },
// });

// export default styles;
