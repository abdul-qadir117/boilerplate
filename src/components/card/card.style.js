import {StyleSheet, Dimensions} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  headerContainer: {
    height: 70,
    width: '90%',
    backgroundColor: '#f2f2f2',
    // flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  headerText: {
    color: '#000099',
    fontSize: 20,
  },
  dateTimeText: {
    color: 'gray',
    fontSize: 10,
    fontWeight: '600',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
  },
  nameContainer: {
    flexDirection: 'row',
  },
});

export default styles;
