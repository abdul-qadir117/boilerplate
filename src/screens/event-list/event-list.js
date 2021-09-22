import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Platform,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Text, Screen, Button, Link} from '@components';
import {Header} from '../../components';
import {Timeline} from 'react-native-just-timeline';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {withNavigation} from '@react-navigation/compat';
import data from './timeline.data';
import styles from './event-list.style';
import CalendarPopup from '../../components/modals/calendar-popup';

const EventList = props => {
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('2021-09-1');
  const [endDate, setEndDate] = useState('2021-09-30');
  const [token, setToken] = useState(
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlkYWQwZDg3YzdhMGYxYjc1NTU4OTk3M2ZkMjg1MzhjZDk4MzAwZGNhMGI2MzViYzAwYTAwNzM0MjhhMzY1NTYwMWJlMDdmOWNkMjY4ZWJkIn0.eyJhdWQiOiIxIiwianRpIjoiOWRhZDBkODdjN2EwZjFiNzU1NTg5OTczZmQyODUzOGNkOTgzMDBkY2EwYjYzNWJjMDBhMDA3MzQyOGEzNjU1NjAxYmUwN2Y5Y2QyNjhlYmQiLCJpYXQiOjE2MzE1NzI5ODEsIm5iZiI6MTYzMTU3Mjk4MSwiZXhwIjoxNjYzMTA4OTgxLCJzdWIiOiIyNTA0Iiwic2NvcGVzIjpbXX0.Kbph0X1MKW-gi8xnelLoV_H4usjWpvJ7HTnHmZXqRw0tzHK2nzm5tu8vbLMVqytmjqOm0sZqm4HUnC6CL6lCHVYRah-FwvSYQxYLiW-yUHhB4q4NiwFh0XxNUHumFlz6WsSY2nZ1EDOp_M1HQqwNSj6RCnrRBKGNvmv2lK3lmhg61RUQX2o3RB0KxG70tBZIcMi2tiwVkQBxXDBNV8_doMc3ZboM7s6Cl24vABMXJUdQEpdb8TDnqlQ0BNdSXPHIuKZfcfSbklYVq5-tyGLzq7k04GzGwOhkhJnXGGIx57LX7nZ3fOeQdMalZF8nWvCu4F5WRPQqsSGYXbjSYfZ0EfHOKYAQHko7aOMBnuiKzAP7ZCsxJfeRZr1vWLyyfK9aWajstmhfOIhbtURoGcz-wxWYcS8avAwoYN8H2RmdjSUW6fBS1oR07VsqZ7_8LCSt1OY7IWNTZCg_c_hpOkQvMp0lN2ScjcamrkWOgsnAABNTkFlZYtKUfZ1cEDipF2uS1zBsw0Quxk9ZGcLNt_8ifYvA_xZ4LLFLpnReB1yvotmVrrmC_dKGpqc9TDDu-UOdW9SCUC-ZpdYXhHn2F1Nu0sCS3sJKQE2YanJmpC0Qzn4UKwZUH_m6FnVmtvlDzMFzaELZIl-BqyFAApUNKTNcuivZjFQgI5Pg4oliKtYpqnQ',
  );
  useEffect(() => {
    // console.log('CalendarComponent: ', getToken);
    console.log('start-date ==>', startDate.dateString, endDate);
    getToken();
    setLoading(true);
    fetch(
      'https://tieredtracker.com/api/all-interventions?joined=1&assigned=1&close_full=1&available=1&end_date=' +
        endDate.dateString +
        '&start_date=' +
        startDate.dateString,
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
          setInterventions(data.data.interventions);
        }
      })
      .catch(error => console.log('Something went wrong', error));
  }, [startDate, endDate]);

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

  const renderItem = ({item}) => (
    <View
      style={{
        // borderWidth: 1,
        width: '100%',
        height: 50,
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
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            {item.start.split('-')[2]}
          </Text>
          <Text style={{fontSize: 8, fontWeight: '700', color: 'gray'}}>
            MON
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            width: '1%',
            height: 100,
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
        <View
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
        </View>
      </View>
    </View>
  );
  return (
    <Screen>
      <Header leftIconName={'bars'} title={'EVENTS LIST'} searchBar />
      <View style={styles.monthView}>
        <Text style={styles.leftIcon}>Sort by:</Text>
        <View style={{flex: 1}} />
        <Text style={styles.monthText}>Start Date {startDate.toString}</Text>
        <CalendarPopup
          title="Start Date"
          onPressed={data => setStartDate(data)}
        />
        <Text style={{...styles.monthText, marginLeft: 20}}>End Date</Text>
        <CalendarPopup title="End Date" onPressed={data => setEndDate(data)} />
        <View style={{flex: 1}} />
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
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </Screen>
  );
};

export default EventList;
