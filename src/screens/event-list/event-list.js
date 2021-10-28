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
  StyleSheet,
  TextInput,
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const EventList = props => {
  const [selectedValue, setSelectedValue] = useState('java');
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [startDate, setStartDate] = useState('2021-09-1');
  // const [endDate, setEndDate] = useState('2021-09-30');
  // const [token, setToken] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [joinmodalVisible, setJoinModalVisible] = useState(false);
  const [available, setAvailable] = useState(1);
  const [teacherAssigned, setTeacherAssigned] = useState(1);
  const [studentJoined, setStudentJoined] = useState(1);
  const [close_full, setCloseFull] = useState(1);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [interventionName, setInterventionName] = useState('All');
  const [interventionAlertMsg, setInterventionAlertMsg] = useState('');
  const [interventionMsgVisible, setInterventionMsgVisible] = useState(false);
  // const [month, setMonth] = useState(1);
  // const [day, setDay] = useState(1);
  var month = 0;
  var day = 0;
  const [interventionbject, setInterventionbject] = useState({});
  var inter_max_ddays = 0;
  var prevDate = '';
  var funFullDate;
  var token;

  React.useEffect(() => {
    // console.log('focus1');
    getMonthh();
    getInterventions();

    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      // console.log('focus2');
      getMonthh();
      getInterventions();
      // console.log('focus3', month, day);
    });

    //Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);
  useEffect(() => {
    // console.log('HEY SH');
    getMonthh();
  });
  useEffect(async () => {
    // console.log('CalendarComponent: ', getToken);
    // console.log(
    //   'start-date ==>',
    //   startDate.dateString,
    //   endDate,
    //   '&end_date=' +
    //     `2021-${month}-${day * 1 + 7}` +
    //     '&start_date=' +
    //     `2021-${month}-${day}`,
    // );
    await getToken();

    setLoading(true);
    getInterventions();
    // getInterventions();
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
    // startDate,
    // endDate,
    available,
    teacherAssigned,
    studentJoined,
    close_full,
    month,
    day,
  ]);

  const getInterventions = async () => {
    await getMonthh();
    console.log('GetInterventions---------------------', token);
    // console.log(
    //   studentJoined +
    //     '&assigned=' +
    //     teacherAssigned +
    //     '&close_full=' +
    //     close_full +
    //     '&available=' +
    //     available +
    //     '&end_date=',
    // );
    const datafetch = await fetch(
      'https://tieredtracker.com/api/all-interventions?joined=' +
        studentJoined +
        '&assigned=' +
        teacherAssigned +
        '&close_full=' +
        close_full +
        '&available=' +
        available +
        '&end_date=' +
        // '2021-09-01'+
        // `2021-${month}-${day * 1 + 7}` +
        funFullDate +
        '&start_date=' +
        `2021-${month}-${day}`,
      // day,
      // '2021-01-01',
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
        console.log(inter_max_ddays, 'data');
        if (data.status === true) {
          console.log(loading, '==>loading');
          setLoading(false);

          //setInterventions(data.data.interventions);

          var interventionData = data.data.interventions.sort(function (a, b) {
            if (funFullDate < `2021-${month}-${day}`) {
              return a.start.split('-')[2] - b.start.split('-')[2];
            } else {
              return a.start.split('-')[2] + b.start.split('-')[2];
            }
          });
          setInterventions(interventionData);
          setFilteredDataSource(interventionData);
          setMasterDataSource(interventionData);
        } else {
          setLoading(false);
        }
      })
      .catch(error => console.log('Something went wrong', error));
  };

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const interventionDay = await AsyncStorage.getItem('interventionDay');
      // console.log(interventionDay, 'interventionDay');
      // console.log('token oo', value);
      // console.log('NNext', getNextDate(0), '==>');
      // await setToken(value);
      token = await value;

      if (value !== null) {
        // value previously stored
        // console.log('NNext', getNextDate(7), '==>');

        inter_max_ddays = interventionDay;
        // await setToken(value);
        getInterventions();

        console.log('token: in Event ', value);
      }
    } catch (e) {
      // error reading value
    }
  };
  function getNextDate(dayNum) {
    const currentDayInMilli = new Date(date).getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const nextDayInMilli = currentDayInMilli + oneDay * dayNum;
    const nextDate = new Date(nextDayInMilli);
    const funDate = nextDate.getDate();
    const funMonth = nextDate.getMonth() + 1;
    const funYear = nextDate.getFullYear();
    var funFullDate;

    if (funDate > 9 && funMonth > 9) {
      funFullDate = funYear + '-' + funMonth + '-' + funDate;
    } else if (funMonth > 9 && funDate > 9) {
      funFullDate = funYear + '-' + '0' + funMonth + '-' + '0' + funDate;
    } else if (funMonth < 10 && funDate < 9) {
      funFullDate = funYear + '-' + '0' + funMonth + '-' + '0' + funDate;
    } else if (funDate > 9 && funMonth < 10) {
      funFullDate = funYear + '-' + '0' + funMonth + '-' + funDate;
    } else {
      funFullDate = funYear + '-' + funMonth + '-' + '0' + funDate;
    }
    console.log(funFullDate);
    return funFullDate;
  }
  const getMonthh = async () => {
    try {
      // const value = await AsyncStorage.getItem('month');
      const value1 = await AsyncStorage.getItem('day');

      const currentDayInMilli = new Date().getTime();
      const oneDay = 1000 * 60 * 60 * 24;
      const nextDayInMilli = currentDayInMilli + oneDay * 7;
      const nextDate = new Date(nextDayInMilli);
      const funDate = nextDate.getDate();
      const funMonth = nextDate.getMonth() + 1;
      const funYear = nextDate.getFullYear();

      if (funDate > 9 && funMonth > 9) {
        funFullDate = funYear + '-' + funMonth + '-' + funDate;
      } else if (funMonth > 9 && funDate > 9) {
        funFullDate = funYear + '-' + '0' + funMonth + '-' + '0' + funDate;
      } else if (funMonth < 10 && funDate < 9) {
        funFullDate = funYear + '-' + '0' + funMonth + '-' + '0' + funDate;
      } else if (funDate > 9 && funMonth < 10) {
        funFullDate = funYear + '-' + '0' + funMonth + '-' + funDate;
      } else {
        funFullDate = funYear + '-' + funMonth + '-' + '0' + funDate;
      }
      console.log(funFullDate, '====u');

      console.log('monthh', value1, value1.split('-')[2], value1.split('-')[1]);
      const monthsLocal = value1.split('-')[1];
      const daysLocal = value1.split('-')[2];
      if (value1 !== null) {
        // value previously stored
        // setMonth(monthsLocal);
        // setDay(daysLocal);
        // console.log('NNext', getNextDate(7), '==>');
        month = monthsLocal;
        day = daysLocal;
        console.log(
          'token: ',
          monthsLocal,
          'monthlocal',
          daysLocal,
          'dayslocal',
          value1,
        );
        // day = value1;
      }
    } catch (e) {
      // error reading value
    }
  };

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const join_intervention = async id => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    await getToken();
    // if (reg.test(email) === false) {
    //   setToastMessage('Email is Not Correct');

    //   return false;
    // } else {

    const formData = new FormData();
    // formData.append('email', email);
    // formData.append('password', password);

    console.log('Join Intervention', token);
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
        getInterventions();
        setInterventionAlertMsg(data.message);
        // Alert.alert(data.message);
        setInterventionMsgVisible(true);
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
              console.log(item, 'item');
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
                fontSize: 14,
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
      <Header title={'INTERVENTIONS LIST'} />
      <View style={stylesInternal.textInputStyle}>
        <View
          style={{
            ...stylesInternal.searchInputContainer,
            flexDirection: 'row',
            height: 50,
            // justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <Icon
            name="search"
            size={16}
            color={'white'}
            style={{alignSelf: 'center'}}
          />
          <TextInput
            style={{...stylesInternal.searchInputContainer, paddingTop: 5}}
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
            placeholderTextColor="white"
          />
          {/* <View
            style={{
              borderWidth: 1,
              height: 20,
              width: 20,
            }}>
            <Icon
              name="search"
              size={16}
              color={'white'}
              // style={styles.icon}
            />
          </View> */}
        </View>
      </View>
      <View style={styles.monthView}>
        {/* <Text style={styles.leftIcon}>Sort by:</Text> */}
        <View
          style={{
            height: 30,
            width: '90%',
            // borderWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-around',
              width: '100%',
              alignItems: 'center',
            }}
            onPress={() => {
              setModalVisible(true);
            }}>
            <View
              style={{
                // borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',

                width: 80,
                height: '100%',
              }}>
              <Text style={styles.leftIcon}>Sort by :</Text>
            </View>
            <View
              style={{
                // borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',

                // width: 200,
                height: '100%',
              }}>
              <Text>{interventionName}</Text>
            </View>

            <View
              style={{
                // borderWidth: 1,
                alignItems: 'center',
                // justifyContent: 'center',

                width: 30,
                height: '100%',
                paddingBottom: 5,
              }}>
              <FontAwesome name="sort-down" size={20} color="gray" />
            </View>
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
            data={filteredDataSource}
            ListHeaderComponent={() => (
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginLeft: 30}}>DATE</Text>
                <Text style={{marginLeft: 100}}>EVENTS</Text>
              </View>
            )}
            ListHeaderComponentStyle={{marginTop: 20}}
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
                  // borderWidth: 1,
                  width: '100%',
                  marginBottom: 30,
                  alignItems: 'flex-end',
                }}
                onPress={() => setModalVisible(!modalVisible)}>
                <FontAwesome name="close" size={30} color="black" />
              </TouchableOpacity>
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
                  setInterventionName('Available');
                  // getInterventions();
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
                  setInterventionName('Teacher Assigned');
                  // getInterventions();
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
                  setInterventionName('Student Joined');
                  // getInterventions();
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
                  setInterventionName('Full/Close');
                  // getInterventions();
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
                  setInterventionName('All');
                  // getInterventions();
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
            setJoinModalVisible(!joinmodalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{
                  // borderWidth: 1,
                  width: '100%',
                  marginBottom: 30,
                  alignItems: 'flex-end',
                }}
                onPress={() => setJoinModalVisible(!joinmodalVisible)}>
                <FontAwesome name="close" size={30} color="black" />
              </TouchableOpacity>
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
                  Room Number :
                </Text>
                <Text style={{fontWeight: '500', width: '30%'}}>
                  {interventionbject.room}
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
                  Class Limit :
                </Text>
                <Text style={{fontWeight: '500', width: '30%'}}>
                  {interventionbject.limit}
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
                  Remaining Seats :
                </Text>
                <Text style={{fontWeight: '500', width: '30%'}}>
                  {interventionbject.remaining}
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
                  Repeat Class :
                </Text>
                <Text style={{fontWeight: '500', width: '30%'}}>
                  {interventionbject.repeat}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: 10,
                }}>
                <Text style={{fontWeight: '600', width: '70%'}}>Detail :</Text>
                <Text style={{fontWeight: '500', width: '30%'}}>
                  {interventionbject.detail}
                </Text>
              </View>
              {interventionbject.interventionStatus !== 'full' &&
              interventionbject.interventionStatus !== 'closed' &&
              interventionbject.interventionStatus !== 'joined' ? (
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
                    You cannot join the intervention because it is{' '}
                    {interventionbject.interventionStatus}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={interventionMsgVisible}
            onRequestClose={() => {
              setInterventionMsgVisible(!interventionMsgVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={{
                    // borderWidth: 1,
                    width: '100%',
                    marginBottom: 30,
                    alignItems: 'flex-end',
                  }}
                  onPress={() =>
                    setInterventionMsgVisible(!interventionMsgVisible)
                  }>
                  <FontAwesome name="close" size={30} color="black" />
                </TouchableOpacity>
                <Text>{interventionAlertMsg}</Text>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </Screen>
  );
};

const stylesInternal = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    padding: 16,
    paddingBottom: 15,
    fontSize: 14,
    fontFamily: 'Lato',
    flexDirection: 'row',
    backgroundColor: '#1c5fa3',
  },
  searchInputContainer: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 28,
    backgroundColor: '#05386b',
    borderColor: '#05386b',
    height: 40,
    width: '90%',
    paddingLeft: 10,
    color: 'white',
  },
});
export default EventList;

// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
// import React, {useState, useEffect} from 'react';

// // import all the components we are going to use
// import {
//   SafeAreaView,
//   Text,
//   StyleSheet,
//   View,
//   FlatList,
//   TextInput,
// } from 'react-native';

// const EventList = () => {
//   const [search, setSearch] = useState('');
//   const [filteredDataSource, setFilteredDataSource] = useState([]);
//   const [masterDataSource, setMasterDataSource] = useState([]);

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//       .then(response => response.json())
//       .then(responseJson => {
//         setFilteredDataSource(responseJson);
//         setMasterDataSource(responseJson);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   const searchFilterFunction = text => {
//     // Check if searched text is not blank
//     if (text) {
//       // Inserted text is not blank
//       // Filter the masterDataSource
//       // Update FilteredDataSource
//       const newData = masterDataSource.filter(function (item) {
//         const itemData = item.title
//           ? item.title.toUpperCase()
//           : ''.toUpperCase();
//         const textData = text.toUpperCase();
//         return itemData.indexOf(textData) > -1;
//       });
//       setFilteredDataSource(newData);
//       setSearch(text);
//     } else {
//       // Inserted text is blank
//       // Update FilteredDataSource with masterDataSource
//       setFilteredDataSource(masterDataSource);
//       setSearch(text);
//     }
//   };

//   const ItemView = ({item}) => {
//     return (
//       // Flat List Item
//       <Text style={styles.itemStyle} onPress={() => getItem(item)}>
//         {item.id}
//         {'.'}
//         {item.title.toUpperCase()}
//       </Text>
//     );
//   };

//   const ItemSeparatorView = () => {
//     return (
//       // Flat List Item Separator
//       <View
//         style={{
//           height: 0.5,
//           width: '100%',
//           backgroundColor: '#C8C8C8',
//         }}
//       />
//     );
//   };

//   const getItem = item => {
//     // Function for click on an item
//     alert('Id : ' + item.id + ' Title : ' + item.title);
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={styles.container}>
//         <TextInput
//           style={styles.textInputStyle}
//           onChangeText={text => searchFilterFunction(text)}
//           value={search}
//           underlineColorAndroid="transparent"
//           placeholder="Search Here"
//         />
//         <FlatList
//           data={filteredDataSource}
//           keyExtractor={(item, index) => index.toString()}
//           ItemSeparatorComponent={ItemSeparatorView}
//           renderItem={ItemView}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//   },
//   itemStyle: {
//     padding: 10,
//   },
//   textInputStyle: {
//     height: 40,
//     borderWidth: 1,
//     paddingLeft: 20,
//     margin: 5,
//     borderColor: '#009688',
//     backgroundColor: '#FFFFFF',
//   },
// });

// export default EventList;
