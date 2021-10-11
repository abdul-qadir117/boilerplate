import {StyleSheet, Dimensions} from 'react-native';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timelineHeadingContainer: {paddingVertical: 30, paddingHorizontal: 15},
  timelineHeadingTitleText: {fontSize: 26, fontWeight: 'bold', color: '#222'},
  underline: {
    height: 3,
    width: '30%',
    marginBottom: 10,
    marginTop: 5,
    backgroundColor: '#6F98FA',
    marginLeft: 20,
  },
  monthView: {
    flexDirection: 'row',
    backgroundColor: '#F6F4F4',
    height: 47,
    alignItems: 'center',
    // justifyContent: 'center',
    // borderWidth: 2,
    shadowOpacity: 0.1,
    shadowOffset: {height: 4},
    zIndex: 10,
    // flex: 1,
  },
  monthText: {
    fontWeight: '600',
    fontSize: 14,
    color: 'grey',
  },
  leftIcon: {
    // marginRight: 10,
    // alignItems: 'flex-start',
    fontWeight: '600',
  },
  rightIcon: {
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default styles;
