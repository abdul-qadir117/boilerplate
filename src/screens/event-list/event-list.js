import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Platform,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Picker,
  Modal,
  Pressable,
} from 'react-native';
import {Text, Screen, Button, Link} from '@components';
import {Header} from '../../components';
import {Timeline} from 'react-native-just-timeline';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {withNavigation} from '@react-navigation/compat';
import data from './timeline.data';
import styles from './event-list.style';
import CalendarPopup from '../../components/modals/calendar-popup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventList = props => {
  const [selectedValue, setSelectedValue] = useState('java');
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('2021-09-1');
  const [endDate, setEndDate] = useState('2021-09-30');
  const [token, setToken] = useState(
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlkYWQwZDg3YzdhMGYxYjc1NTU4OTk3M2ZkMjg1MzhjZDk4MzAwZGNhMGI2MzViYzAwYTAwNzM0MjhhMzY1NTYwMWJlMDdmOWNkMjY4ZWJkIn0.eyJhdWQiOiIxIiwianRpIjoiOWRhZDBkODdjN2EwZjFiNzU1NTg5OTczZmQyODUzOGNkOTgzMDBkY2EwYjYzNWJjMDBhMDA3MzQyOGEzNjU1NjAxYmUwN2Y5Y2QyNjhlYmQiLCJpYXQiOjE2MzE1NzI5ODEsIm5iZiI6MTYzMTU3Mjk4MSwiZXhwIjoxNjYzMTA4OTgxLCJzdWIiOiIyNTA0Iiwic2NvcGVzIjpbXX0.Kbph0X1MKW-gi8xnelLoV_H4usjWpvJ7HTnHmZXqRw0tzHK2nzm5tu8vbLMVqytmjqOm0sZqm4HUnC6CL6lCHVYRah-FwvSYQxYLiW-yUHhB4q4NiwFh0XxNUHumFlz6WsSY2nZ1EDOp_M1HQqwNSj6RCnrRBKGNvmv2lK3lmhg61RUQX2o3RB0KxG70tBZIcMi2tiwVkQBxXDBNV8_doMc3ZboM7s6Cl24vABMXJUdQEpdb8TDnqlQ0BNdSXPHIuKZfcfSbklYVq5-tyGLzq7k04GzGwOhkhJnXGGIx57LX7nZ3fOeQdMalZF8nWvCu4F5WRPQqsSGYXbjSYfZ0EfHOKYAQHko7aOMBnuiKzAP7ZCsxJfeRZr1vWLyyfK9aWajstmhfOIhbtURoGcz-wxWYcS8avAwoYN8H2RmdjSUW6fBS1oR07VsqZ7_8LCSt1OY7IWNTZCg_c_hpOkQvMp0lN2ScjcamrkWOgsnAABNTkFlZYtKUfZ1cEDipF2uS1zBsw0Quxk9ZGcLNt_8ifYvA_xZ4LLFLpnReB1yvotmVrrmC_dKGpqc9TDDu-UOdW9SCUC-ZpdYXhHn2F1Nu0sCS3sJKQE2YanJmpC0Qzn4UKwZUH_m6FnVmtvlDzMFzaELZIl-BqyFAApUNKTNcuivZjFQgI5Pg4oliKtYpqnQ',
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [available, setAvailable] = useState(1);
  const [teacherAssigned, setTeacherAssigned] = useState(1);
  const [studentJoined, setStudentJoined] = useState(1);
  const [close_full, setCloseFull] = useState(1);
  const [month, setMonth] = useState();
  var prevDate = '';
  React.useEffect(() => {
    console.log('focus');
    getMonthh();

    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      console.log('focus');
      getMonthh();
    });

    //Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);
  useEffect(() => {
    console.log('HEY SH');
    getMonthh();
  });
  useEffect(() => {
    // console.log('CalendarComponent: ', getToken);
    console.log('start-date ==>', startDate.dateString, endDate);
    getToken();

    setLoading(true);
    fetch(
      'https://tieredtracker.com/api/all-interventions?joined=' +
        studentJoined +
        '&assigned=' +
        teacherAssigned +
        '&close_full=' +
        close_full +
        '&available=' +
        available +
        '&end_date=' +
        `2021-${month}-28` +
        '&start_date=' +
        `2021-${month}-1`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(async response => {
        let data = await response.json();
        console.log(data, token, '==>');
        if (data.status === true) {
          console.log(loading, '==>loading');
          setLoading(false);
          //setInterventions(data.data.interventions);

          var interventionData = data.data.interventions.sort(function (a, b) {
            return a.start.split('-')[2] - b.start.split('-')[2];
          });
          setInterventions(interventionData);
        }
      })
      .catch(error => console.log('Something went wrong', error));
  }, [
    startDate,
    endDate,
    available,
    teacherAssigned,
    studentJoined,
    close_full,
    month,
  ]);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      console.log('token oo', value);
      if (value !== null) {
        // value previously stored
        setToken(value);
        console.log('token: in Event ', value);
      }
    } catch (e) {
      // error reading value
    }
  };
  const getMonthh = async () => {
    try {
      const value = await AsyncStorage.getItem('month');
      console.log('monthh', value);
      if (value !== null) {
        // value previously stored
        setMonth(value);
        console.log('token: ', value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const join_intervention = id => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // if (reg.test(email) === false) {
    //   setToastMessage('Email is Not Correct');

    //   return false;
    // } else {

    const formData = new FormData();
    // formData.append('email', email);
    // formData.append('password', password);

    fetch('https://tieredtracker.com/api/intervention/join/' + id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      // body: formData,
    })
      .then(async response => {
        let data = await response.json();
        console.log(data, 'Jooined interventions');
        alert(data.message);
      })
      .catch(error => console.log('Something went wrong', error));
  };

  const renderItem = ({item, index}) => (
    (prevDate = item.start.split('-')[2]),
    (
      <View
        style={{
          // borderWidth: 1,
          width: '100%',
          height: 120,
          flexDirection: 'row',
        }}>
        <View
          style={{
            // borderWidth: 1,
            width: '25%',
            height: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              // borderWidth: 1,
              height: 40,
              width: 40,
              alignItems: 'center',
              marginLeft: 30,
            }}>
            {/* {item.start.split('-')[2] != prevDate ||
              (index === 0 && ( */}
            <>
              <Text style={{fontSize: 18, fontWeight: '700'}}>
                {item.start.split('-')[2]}
                {/* {prevDate} */}
              </Text>
              <Text style={{fontSize: 8, fontWeight: '700', color: 'gray'}}>
                MON
              </Text>
            </>
            {/* ))} */}
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              width: '1%',
              height: 150,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                backgroundColor: 'gray',
                width: 14,
                height: 14,
                borderRadius: 7,
              }}></View>
          </View>
        </View>
        <View
          style={{
            // borderWidth: 1,
            width: '75%',
            height: '100%',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              join_intervention(item.id);
            }}
            style={{
              borderWidth: 1,
              width: '80%',
              height: 40,
              backgroundColor: item.backgroundColor,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: item.backgroundColor,
              marginTop: 50,
            }}>
            <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>
              {item.teacher}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
  return (
    <Screen>
      <Header leftIconName={'bars'} title={'EVENTS LIST'} searchBar />
      <View style={styles.monthView}>
        {/* <Text style={styles.leftIcon}>Sort by:</Text> */}
        <View
          style={{
            height: 30,
            width: 200,
            // borderWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={styles.leftIcon}>Sort by:</Text>
          </TouchableOpacity>
          {/* 
          <Picker
            selectedValue={selectedValue}
            style={{height: 30, width: 200}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="Available" value="Available" />
            <Picker.Item label="Teacher assigned" value="Teacher assigned" />
            <Picker.Item label="Student Joined" value="Student Joined" />
            <Picker.Item label="Full/Close" value="Full/Close" />
          </Picker> */}
        </View>
        {/* <View style={{flex: 1}} />
        <Text style={styles.monthText}>Start Date {startDate.toString}</Text>
        <CalendarPopup
          title="Start Date"
          onPressed={data => setStartDate(data)}
        />
        <Text style={{...styles.monthText, marginLeft: 20}}>End Date</Text>
        <CalendarPopup title="End Date" onPressed={data => setEndDate(data)} />
        <View style={{flex: 1}} /> */}
      </View>
      <View
        style={{
          // borderWidth: 1,
          width: '100%',
          height: '70%',
          flexDirection: 'row',
        }}>
        {loading === true ? (
          <View style={{width: '100%', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={interventions}
            renderItem={renderItem}
            keyExtractor={(item, index) => {
              item.id;
            }}
          />
        )}
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  height: 30,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setAvailable(1);
                  setCloseFull(0);
                  setTeacherAssigned(0);
                  setStudentJoined(0);
                }}>
                <Text style={{fontWeight: '600'}}>Available</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  height: 30,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setAvailable(0);
                  setCloseFull(0);
                  setTeacherAssigned(1);
                  setStudentJoined(0);
                }}>
                <Text style={{fontWeight: '600'}}>Teacher assigned</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  height: 30,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setAvailable(0);
                  setCloseFull(0);
                  setTeacherAssigned(0);
                  setStudentJoined(1);
                }}>
                <Text style={{fontWeight: '600'}}>Student Joined</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  height: 30,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setAvailable(0);
                  setCloseFull(1);
                  setTeacherAssigned(0);
                  setStudentJoined(0);
                }}>
                <Text style={{fontWeight: '600'}}>Full/Close</Text>
              </TouchableOpacity>
              {/* <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable> */}
            </View>
          </View>
        </Modal>
      </View>
    </Screen>
  );
};

export default EventList;
