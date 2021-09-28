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
  const [months, setMonths] = useState();
  var date1 = new Date();
  var date2 = date1.toString().split('T')[0];
  console.log(date2);
  useEffect(() => {
    // console.log('CalendarComponent: ', getToken);
    if (months === undefined || months === null || months === '') {
      if (new Date(date).getMonth() + 1 > 9) {
        setMonths(new Date(date).getMonth() + 1);
      } else {
        setMonths(0 + new Date(date).getMonth() + 1);
      }
    }
    getToken();
    console.log(new Date(date).getMonth() + 1, 'Mpnth == ? ');
    setLoading(true);
    fetch(
      'https://tieredtracker.com/api/all-holidays?&end_date=' +
        `2021-${months}-28` +
        '&start_date=' +
        `2021-${months}-1`,
      // 'https://tieredtracker.com/api/all-interventions?joined=1&assigned=1&close_full=1&available=1&end_date=' +
      //   date +
      //   '&start_date=' +
      //   date,
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
        console.log(data);
        if (data.status === true) {
          console.log(loading, '==>loading');
          console.log(data.data.holidays.length, '==>data');
          if (data.data.holidays.length === 0) {
            alert('There is no holiday this month');
          }
          setLoading(false);
          setInterventions(data.data.holidays);
        }
      })
      .catch(error => console.log('Something went wrong', error));
  }, [months]);

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
      name={item.name}
      time={item.start}
      date={item.interventionTime}
    />
  );

  return (
    <Screen style={{marginTop: 50}}>
      <Header leftIconName={'power-off'} title={'Your Calendar'} />
      <CommonHeader title={date} />
      <Calendar
        markingType={'multi-dot'}
        current={new Date()}
        markedDates={{
          '2021-09-16': {selected: true, marked: true, selectedColor: 'blue'},
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
        }}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth, day) => {
          subtractMonth();
        }}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        onMonthChange={month => {
          let currentMonth = month.month.toString();
          if (month.month > 9) {
            setMonths(month.month);
          } else {
            setMonths(0 + month.month);
          }
          // setMonths(month.month);
          console.log('month changed', typeof currentMonth);
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
