import {StyleSheet, Dimensions} from 'react-native';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    borderWidth: 1,
    height: '50%',
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
