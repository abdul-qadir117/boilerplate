import React, {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, Screen, Button, Link, Header} from '@components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Calendar} from 'react-native-calendars';
import CommonHeader from '../../components/common-header/commonHeader';
import CardComponent from '../../components/card/card';

const CalendarComponent = ({route}) => {
  //   const {token} = route.params;
  const [date, setDate] = useState('2021-09-10');
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    // console.log('CalendarComponent: ', getToken);
    getToken();
    setLoading(true);
    fetch(
      'https://tieredtracker.com/api/all-interventions?joined=1&assigned=1&close_full=1&available=1&end_date=' +
        date +
        '&start_date=' +
        date,
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
        console.log(data.status);
        if (data.status === true) {
          console.log(loading, '==>loading');
          setLoading(false);
          setInterventions(data.data.interventions);
        }
      })
      .catch(error => console.log('Something went wrong', error));
  }, [date]);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      console.log('token', value);
      if (value !== null) {
        // value previously stored
        setToken(value);
        console.log('token: ', value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const renderItem = ({item}) => (
    <CardComponent
      text={item.room}
      name={item.teacher}
      time={item.start}
      date={item.end}
    />
  );

  return (
    <Screen style={{marginTop: 50}}>
      <Header leftIconName={'power-off'} title={'Your Calendar'} />
      <CommonHeader title={date} />
      <Calendar
        markingType={'period'}
        markedDates={{
          '2021-09-15': {
            selected: true,
            marked: true,
            selectedColor: 'red',
          },
          '2021-09-16': {marked: true, dotColor: '#50cebb'},
          '2021-09-21': {
            startingDay: true,
            color: '#1a53ff',
            textColor: 'white',
          },
          '2021-09-22': {color: '#1a53ff', textColor: 'white'},
          '2021-09-23': {
            color: '#1a53ff',
            textColor: 'white',
            marked: true,
            dotColor: 'white',
          },
          '2021-09-24': {color: '#1a53ff', textColor: 'white'},
          '2021-09-25': {endingDay: true, color: '#1a53ff', textColor: 'white'},
        }}
        onDayPress={day => {
          setDate(day.dateString);
        }}
      />
      <View
        style={{
          height: 1,
          backgroundColor: 'lightray',
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
        }}
      />
      <Text
        style={{
          color: '#000099',
          fontSize: 14,
          letterSpacing: 1,
          fontWeight: '700',
          alignSelf: 'center',
          marginVertical: 30,
        }}>
        HOLIDAYS IN MARCH
      </Text>
      {loading === true ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={interventions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </Screen>
  );
};

export default CalendarComponent;
