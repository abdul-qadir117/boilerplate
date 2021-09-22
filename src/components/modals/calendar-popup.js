import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, Screen, Button, Link, Header} from '@components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Calendar} from 'react-native-calendars';

const CalendarPopup = ({title, onPressed}) => {
  //   const {token} = route.params;
  const [date, setDate] = useState('2021-09-10');
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{width: '100%', alignSelf: 'flex-end', marginBottom: 20}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Icon
                name={'times'}
                size={18}
                style={styles.rightIcon}
                color={'grey'}
              />
            </TouchableOpacity>
            <Text>{title}</Text>
            <Calendar
              markingType={'period'}
              markedDates={{
                '2021-09-15': {
                  selected: true,
                  marked: true,
                  selectedColor: 'red',
                },
              }}
              onDayPress={day => {
                onPressed(day);
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}>
        <Icon
          name={'chevron-down'}
          size={18}
          style={styles.rightIcon}
          color={'grey'}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
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
export default CalendarPopup;
