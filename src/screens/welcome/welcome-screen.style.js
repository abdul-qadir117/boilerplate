import {StyleSheet, Dimensions} from 'react-native';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageLogo: {
    height: 150,
    width: 150,
  },
  mainIllustration: {
    height: 300,
    width: 300,
  },
  name: {
    fontSize: 16,
    marginRight: 2,
    color: 'grey',
    fontWeight: '600',
  },
});

export default styles;
