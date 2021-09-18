import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {Text, Screen, Button, Link} from '@components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Calendar} from 'react-native-calendars';
import CommonHeader from '../../components/common-header/commonHeader';
import CardComponent from '../../components/card/card';

const CalendarComponent = props => {
  const [date, setDate] = useState('');
  const DATA = [
    {
      id: '1',
      name: 'J.Doe',
      discription: 'Meeting with',
      time: '03:15 PM',
      date: '12March',
    },
    {
      id: '2',
      name: 'J.Doe',
      discription: 'Call with',
      time: '03:16 PM',
      date: '12March',
    },
    {
      id: '3',
      name: 'J.Doe',
      discription: 'Meeting with',
      time: '03:15 PM',
      date: '12March',
    },
  ];
  const renderItem = ({item}) => (
    <CardComponent
      text={item.discription}
      name={item.name}
      time={item.time}
      date={item.date}
    />
  );
  return (
    <Screen style={{marginTop: 50}}>
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
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Screen>
  );
};

export default CalendarComponent;
