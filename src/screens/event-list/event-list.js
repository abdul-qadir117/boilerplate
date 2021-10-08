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
  Alert,
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
  const [joinmodalVisible, setJoinModalVisible] = useState(false);
  const [available, setAvailable] = useState(1);
  const [teacherAssigned, setTeacherAssigned] = useState(1);
  const [studentJoined, setStudentJoined] = useState(1);
  const [close_full, setCloseFull] = useState(1);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [interventionbject, setInterventionbject] = useState({});
  var inter_max_ddays = 0;
  var prevDate = '';
  React.useEffect(() => {
    console.log('focus1');
    getMonthh();
    getInterventions();

    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      console.log('focus2');
      getMonthh();
      getInterventions();
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
    console.log(
      'start-date ==>',
      startDate.dateString,
      endDate,
      '&end_date=' +
        `2021-${month}-${day * 1 + 7}` +
        '&start_date=' +
        `2021-${month}-${day}`,
    );
    getToken();

    setLoading(true);
    getInterventions();
    // fetch(
    //   'https://tieredtracker.com/api/all-interventions?joined=' +
    //     studentJoined +
    //     '&assigned=' +
    //     teacherAssigned +
    //     '&close_full=' +
    //     close_full +
    //     '&available=' +
    //     available +
    //     '&end_date=' +
    //     `2021-${month}-${day * 1 + 5}` +
    //     '&start_date=' +
    //     `2021-${month}-${day}`,
    //   {
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'multipart/form-data',
    //       Authorization: `Bearer ${token}`,
    //     },
    //   },
    // )
    //   .then(async response => {
    //     let data = await response.json();
    //     console.log(data.data, token, '==>');
    //     if (data.status === true) {
    //       console.log(loading, '==>loading');
    //       setLoading(false);
    //       //setInterventions(data.data.interventions);

    //       var interventionData = data.data.interventions.sort(function (a, b) {
    //         return a.start.split('-')[2] - b.start.split('-')[2];
    //       });
    //       setInterventions(interventionData);
    //     }
    //   })
    //   .catch(error => console.log('Something went wrong', error));
  }, [
    startDate,
    endDate,
    available,
    teacherAssigned,
    studentJoined,
    close_full,
    month,
    day,
  ]);

  const getInterventions = () => {
    console.log(inter_max_ddays, 'inter_max_ddays');
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
        `2021-${month}-${day * 1 + 7}` +
        '&start_date=' +
        `2021-${month}-${day}`,
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
        // console.log(data.data, token, '==>');
        console.log(inter_max_ddays, 'data');
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
  };

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const interventionDay = await AsyncStorage.getItem('interventionDay');
      console.log(interventionDay, 'interventionDay');
      console.log('token oo', value);
      if (value !== null) {
        // value previously stored
        inter_max_ddays = interventionDay;
        setToken(value);
        console.log('token: in Event ', value);
      }
    } catch (e) {
      // error reading value
    }
  };
  const getMonthh = async () => {
    try {
      // const value = await AsyncStorage.getItem('month');
      const value1 = await AsyncStorage.getItem('day');

      console.log('monthh', value1, value1.split('-')[2], value1.split('-')[1]);
      const monthsLocal = value1.split('-')[1];
      const daysLocal = value1.split('-')[2];
      if (value1 !== null) {
        // value previously stored
        setMonth(monthsLocal);
        setDay(daysLocal);
        console.log('token: ', value1);
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
        Alert.alert(data.message);
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
            alignItems: 'center',
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
                {/* MON */}
                {new Date(item.start).toString().split(' ')[0]}
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
            // onPress={() => {
            //   join_intervention(item.id);
            // }}
            onPress={() => {
              setInterventionbject(item);
              setJoinModalVisible(true);
            }}
            style={{
              borderWidth: 1,
              width: '90%',
              height: 90,
              backgroundColor: item.backgroundColor,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: item.backgroundColor,
              marginTop: 20,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: 'white',
                textAlign: 'center',
              }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
  return (
    <Screen>
      <Header title={'INTERVENTIONS LIST'} searchBar />
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
                  setAvailable(1);
                  setCloseFull(1);
                  setTeacherAssigned(1);
                  setStudentJoined(1);
                }}>
                <Text style={{fontWeight: '600'}}>All</Text>
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
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={joinmodalVisible}
          onRequestClose={() => {
            setModalVisible(!joinmodalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{
                  fontWeight: '700',
                  textAlign: 'center',
                  fontSize: 16,
                  color: 'gray',
                }}>
                {interventionbject.title}
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  height: 0.1,
                  width: '100%',
                  marginTop: 10,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: 40,
                }}>
                <Text style={{fontWeight: '600', width: '70%'}}>
                  Teacher Name :
                </Text>
                <Text style={{fontWeight: '500', width: '30%'}}>
                  {interventionbject.teacher}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: 10,
                }}>
                <Text style={{fontWeight: '600', width: '70%'}}>
                  Intervention Status :
                </Text>
                <Text style={{fontWeight: '500', width: '30%'}}>
                  {interventionbject.interventionStatus}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: 10,
                }}>
                <Text style={{fontWeight: '600', width: '70%'}}>
                  Intervention Type :
                </Text>
                <Text style={{fontWeight: '500', width: '30%'}}>
                  {interventionbject.interventionType}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: 10,
                }}>
                <Text style={{fontWeight: '600', width: '70%'}}>Limit :</Text>
                <Text style={{fontWeight: '500', width: '30%'}}>
                  {interventionbject.limit}
                </Text>
              </View>
              {interventionbject.interventionStatus === 'full' ? (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    height: 30,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 40,
                  }}
                  onPress={() => {
                    setJoinModalVisible(!joinmodalVisible);

                    join_intervention(interventionbject.id);
                  }}>
                  <Text style={{fontWeight: '600'}}>Join Intervention</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setJoinModalVisible(!joinmodalVisible);
                  }}>
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 10,
                      marginTop: 30,
                      fontWeight: '700',
                    }}>
                    You cannot join the intervention because it is full
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </Screen>
  );
};

export default EventList;
