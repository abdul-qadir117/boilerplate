import {StyleSheet, Dimensions} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    width: '100%',
    backgroundColor: '#4d88ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default styles;
