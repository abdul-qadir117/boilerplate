import React, {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, Screen, Button, Link, Header} from '@components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Calendar} from 'react-native-calendars';
import CommonHeader from '../../components/common-header/commonHeader';
import CardComponent from '../../components/card/card';

const CalendarComponent = ({route}) => {
  //   const {token} = route.params;
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const currentFullDate =
    currentDate > 9 && currentMonth > 9
      ? `${currentYear}-${currentMonth}-${currentDate}`
      : currentDate < 9 && currentMonth < 10
      ? `${currentYear}-0${currentMonth}-0${currentDate}`
      : currentDate > 9 && currentMonth < 10
      ? `${currentYear}-0${currentMonth}-${currentDate}`
      : `${currentYear}-${currentMonth}-0${currentDate}`;
  const [date, setDate] = useState(currentFullDate);
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [months, setMonths] = useState();
  const [markedDates, setMarkedDates] = useState({});
  const [maxInterventions, setMaxInterventions] = useState(0);
  const monthsArray = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NVEMBER',
    'DECEMBER',
  ];

  var tokkenValue = '';
  // const markedDates = {};
  var date1 = new Date();
  var date2 = date1.toString().split('T')[0];
  var date3;
  var monthname = date2.split(' ')[1];

  const [monthNameHook, setMonthNameHook] = useState(
    monthsArray[date1.getMonth()],
  );
  console.log(date2, '=====', monthname, currentFullDate, '===...>');
  useEffect(() => {
    // console.log('MarkedDAt', markedDates, '====>', new Date());
    // console.log('CalendarComponent: ', getToken);

    console.log(new Date(), '====>');
    if (months === undefined || months === null || months === '') {
      if (new Date(date).getMonth() + 1 > 9) {
        setMonths(new Date(date).getMonth() + 1);
      } else {
        setMonths(0 + new Date(date).getMonth() + 1);
      }
    }
    getToken();
    //setMonthData(date);
    // console.log(new Date(date).getMonth() + 1, 'Mpnth == ? ');

    setLoading(true);
    // setInterval(() => {
    // fetch(
    //   'https://tieredtracker.com/api/all-holidays?&end_date=' +
    //     `2021-${months}-28` +
    //     '&start_date=' +
    //     `2021-${months}-1`,
    //   // 'https://tieredtracker.com/api/all-interventions?joined=1&assigned=1&close_full=1&available=1&end_date=' +
    //   //   date +
    //   //   '&start_date=' +
    //   //   date,
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
    //     console.log(data, 'GGet Holydays APi', months, '===>', token);
    //     if (data.status === true) {
    //       console.log(loading, '==>loading');
    //       console.log(data.data.holidays.length, '==>data');
    //       if (data.data.holidays.length === 0) {
    //         Alert.alert('There is no holiday this month');
    //       }
    //       setLoading(false);
    //       setInterventions(data.data.holidays);
    //     } else {
    //     }
    //   })
    //   .catch(error => console.log('Something went wrong', error));
    // }, 5000);
  }, [months]);

  const getHolidays = () => {
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
          Authorization: `Bearer ${tokkenValue}`,
        },
      },
    )
      .then(async response => {
        let data = await response.json();
        // console.log(data, 'GGet Holydays APi', months, '===>', token);
        if (data.status === true) {
          // console.log(loading, '==>loading');
          console.log(data.data.holidays, 'data======....');
          console.log(data.data.holidays.length, '==>data');
          if (data.data.holidays.length === 0) {
            Alert.alert('There is no holiday this month');
          }
          setLoading(false);
          setInterventions(data.data.holidays);
        } else {
        }
      })
      .catch(error => console.log('Something went wrong', error));
  };
  function getNextDate(dayNum) {
    const currentDayInMilli = new Date(date).getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const nextDayInMilli = currentDayInMilli + oneDay * dayNum;
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

    return funFullDate;
  }
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const interventionDay = await AsyncStorage.getItem('interventionDay');
      console.log('token', value);
      if (value !== null) {
        // value previously stored
        // console.log('token get ===....', value);
        setToken(value);
        tokkenValue = value;
        setMaxInterventions(interventionDay);
        // console.log(
        //   'token: ',
        //   value,
        //   '===> interventionDay',
        //   interventionDay,
        //   maxInterventions,
        // );
        // function getNextDate(dayNum) {
        //   const currentDayInMilli = new Date(date).getTime();
        //   const oneDay = 1000 * 60 * 60 * 24;
        //   const nextDayInMilli = currentDayInMilli + oneDay * dayNum;
        //   const nextDate = new Date(nextDayInMilli);
        //   const funDate = nextDate.getDate();
        //   const funMonth = nextDate.getMonth() + 1;
        //   const funYear = nextDate.getFullYear();

        //   if (funDate > 9 && funMonth > 9) {
        //     funFullDate = funYear + '-' + funMonth + '-' + funDate;
        //   } else if (funMonth > 9 && funDate > 9) {
        //     funFullDate = funYear + '-' + '0' + funMonth + '-' + '0' + funDate;
        //   } else if (funMonth < 10 && funDate < 9) {
        //     funFullDate = funYear + '-' + '0' + funMonth + '-' + '0' + funDate;
        //   } else if (funDate > 9 && funMonth < 10) {
        //     funFullDate = funYear + '-' + '0' + funMonth + '-' + funDate;
        //   } else {
        //     funFullDate = funYear + '-' + funMonth + '-' + '0' + funDate;
        //   }

        //   return funFullDate;
        // }
        setMonthData(getNextDate(0));
        markedDates[getNextDate(0)] = {
          startingDay: true,
          color: '#50cebb',
          textColor: 'white',
        };
        // getNextDate(1);
        for (let i = 1; i < interventionDay; i++) {
          console.log(i, '==>i');
          markedDates[getNextDate(i)] = {
            color: '#50cebb',
            textColor: 'white',
            endingDay: i === interventionDay - 1 ? true : false,
          };
        }
        getHolidays();
        // console.log(markedDates, 'markedDates', getNextDate(0));
      }
    } catch (e) {
      // error reading value
    }
  };

  const setMonthData = async d => {
    try {
      // await AsyncStorage.setItem('month', m.toString());
      console.log(d, '==>d');
      var m = await AsyncStorage.setItem('day', d);
      console.log('asdasdasda', m);
    } catch (e) {
      // saving error
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
      {/* <CommonHeader title={date} /> */}
      <Calendar
        // markingType={'multi-dot'}
        // console.log("hheello");
        markingType={'period'}
        current={new Date()}
        markedDates={markedDates}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth, day) => {
          // var dateLeeft = day.toString().split('T')[0];
          // monthname = dateLeeft.split(' ')[2];
          // alert(day.getMonth());
          setMonthNameHook(monthsArray[day.getMonth() - 1 * 1]);
          // console.log(
          //   dateLeeft,
          //   'geet month',
          //   day.getMonth() + 1 * 1,
          //   monthname,
          //   '==>dateLeeft',
          // );
          subtractMonth();
        }}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth, day) => {
          // var dateRightt = day.toString().split('T')[0];
          // monthname = dateRightt.split(' ')[2];
          // alert(day.getMonth().toString());
          // console.log(
          //   dateRightt,
          //   'geet month',
          //   day.getMonth(),
          //   monthname,
          //   '==>dateRightt',
          // );

          setMonthNameHook(monthsArray[day.getMonth() + 1 * 1]);
          addMonth();
        }}
        onMonthChange={month => {
          let currentMonth = month.month.toString();
          console.log(month.month, 'month');
          if (month.month > 9) {
            setMonths(month.month);
          } else {
            setMonths(0 + month.month);
          }
          // setMonths(month.month);
          console.log('month changed', typeof currentMonth);
        }}
        // onDayPress={day => {
        //   // setMarkedDates(null);
        //   // if (
        //   //   markedDates === undefined ||
        //   //   markedDates === null ||
        //   //   markedDates === ''
        //   // ) {
        //   //   console.log('MarkedDAt', markedDates, '====>Truue');
        //   // } else {
        //   //   console.log('=========>False');
        //   // }
        //   const dayy = day.dateString;

        //   //const dd = day.toISOString().split('T')[0];
        //   const dayplus = dayy.split('-')[2] * 1 + 1;
        //   const dayplustwo = dayy.split('-')[2] * 1 + 2;
        //   const dayplusthree = dayy.split('-')[2] * 1 + 3;
        //   const dayplusfour = dayy.split('-')[2] * 1 + 4;
        //   const monthplus = dayy.split('-')[1];
        //   const yearplus = dayy.split('-')[0];
        //   const fullDate = yearplus + '-' + monthplus + '-' + dayplus;
        //   const fullDatetwo = yearplus + '-' + monthplus + '-' + dayplustwo;
        //   const fullDatethree = yearplus + '-' + monthplus + '-' + dayplusthree;
        //   const fullDatefour = yearplus + '-' + monthplus + '-' + dayplusfour;
        //   var funFullDate;
        //   // alert(fullDate);
        //   // if (!markedDates) {

        //   // }
        //   // if (!markedDates[dayy]) {
        //   // markedDates[dayy] = {};
        //   // setMarkedDates();
        //   // markedDates.constructor;
        //   // getNextDate();
        //   function getNextDate(dayNum) {
        //     // const dayNum = 2;
        //     const currentDayInMilli = new Date(dayy).getTime();
        //     const oneDay = 1000 * 60 * 60 * 24;
        //     const nextDayInMilli = currentDayInMilli + oneDay * dayNum;
        //     const nextDate = new Date(nextDayInMilli);
        //     const funDate = nextDate.getDate();
        //     const funMonth = nextDate.getMonth() + 1;
        //     const funYear = nextDate.getFullYear();
        //     // funFullDate =
        //     //   funDate > 9
        //     //     ? funYear + '-' + funMonth + '-' + funDate
        //     //     : funMonth > 9
        //     //     ? funYear + '-' + '0' + funMonth + '-' + funDate
        //     //     : funYear + '-' + '0' + funMonth + '-' + '0' + funDate;
        //     if (funDate > 9 && funMonth > 9) {
        //       funFullDate = funYear + '-' + funMonth + '-' + funDate;
        //     } else if (funMonth > 9 && funDate > 9) {
        //       funFullDate =
        //         funYear + '-' + '0' + funMonth + '-' + '0' + funDate;
        //     } else if (funMonth < 10 && funDate < 9) {
        //       funFullDate =
        //         funYear + '-' + '0' + funMonth + '-' + '0' + funDate;
        //     } else if (funDate > 9 && funMonth < 10) {
        //       funFullDate = funYear + '-' + '0' + funMonth + '-' + funDate;
        //     } else {
        //       funFullDate = funYear + '-' + funMonth + '-' + '0' + funDate;
        //     }
        //     // console.log(funFullDate, 'funFullDate');
        //     return funFullDate;
        //     // alert(funFullDate);
        //   }

        //   console.log('DAy Clicked', dayy);
        //   console.log(
        //     markedDates,
        //     '---',
        //     Object.keys(markedDates).length === 0 &&
        //       markedDates.constructor === Object,
        //     '==>markedDates',
        //   );

        // setMarkedDates({});

        // function ifEmpty() {
        // markedDates[dayy] = {
        //   startingDay: true,
        //   color: '#50cebb',
        //   textColor: 'white',
        // };
        // markedDates[fullDate] = {
        //   color: '#50cebb',
        //   textColor: 'white',
        // };
        // markedDates[fullDatetwo] = {
        //   color: '#50cebb',
        //   textColor: 'white',
        // };
        // markedDates[fullDatethree] = {
        //   color: '#50cebb',
        //   textColor: 'white',
        // };
        // markedDates[fullDatefour] = {
        //   endingDay: true,
        //   color: '#50cebb',
        //   textColor: 'white',
        // };
        //   console.log('MarkedDAt', markedDates, '====>IfEEmptyy');
        // }
        // function ifNotEmpty() {
        //   setMarkedDates({});
        //   if (
        //     (Object.keys(markedDates).length === 0 &&
        //       markedDates.constructor === Object) === true
        //   ) {
        //     console.log('Empty === True');
        //   } else {
        //     console.log('Empty === False');
        //   }
        //   console.log('MarkedDAt', markedDates, '====>IfNootEmpty');
        //   ifEmpty();
        // }
        // if (
        //   // markedDates === undefined ||
        //   // markedDates === null ||
        //   (Object.keys(markedDates).length === 0 &&
        //     markedDates.constructor === Object) === true
        // ) {
        //   console.log('True');

        // markedDates[dayy] = {
        //   startingDay: true,
        //   color: '#50cebb',
        //   textColor: 'white',
        // };
        // getNextDate(1);
        // for (let i = 1; i < maxInterventions; i++) {
        //   markedDates[getNextDate(i)] = {
        //     color: '#50cebb',
        //     textColor: 'white',
        //     endingDay: i === maxInterventions - 1 ? true : false,
        //   };
        // }
        // getNextDate(2);

        // markedDates[getNextDate(2)] = {
        //   color: '#50cebb',
        //   textColor: 'white',
        // };
        // // getNextDate(3);

        // markedDates[getNextDate(3)] = {
        //   color: '#50cebb',
        //   textColor: 'white',
        // };
        // // getNextDate(4);

        // markedDates[getNextDate(4)] = {
        //   endingDay: true,
        //   color: '#50cebb',
        //   textColor: 'white',
        // };
        //   console.log(markedDates);
        // } else {
        //   console.log('False');
        //   console.log(markedDates);
        //   ifNotEmpty();
        // setMarkedDates({});
        // new markedDates();
        // markedDates[dayy] = {
        //   startingDay: true,
        //   color: '#50cebb',
        //   textColor: 'white',
        // };
        // markedDates[fullDate] = {
        //   color: '#50cebb',
        //   textColor: 'white',
        // };
        // markedDates[fullDatetwo] = {
        //   color: '#50cebb',
        //   textColor: 'white',
        // };
        // markedDates[fullDatethree] = {
        //   color: '#50cebb',
        //   textColor: 'white',
        // };
        // markedDates[fullDatefour] = {
        //   endingDay: true,
        //   color: '#50cebb',
        //   textColor: 'white',
        // };
        //}
        // setMarkedDates(markedDates);
        // markedDates[dayy].push({
        //   selected: true,
        //   marked: true,
        //   selectedColor: 'blue',
        // });
        // markedDates[dayy].push({
        //   selected: true,
        //   marked: true,
        //   selectedColor: 'blue',
        // });
        // }
        // console.log(markedDates);
        // if (day.day > 9) {
        //   setDate(day.day);
        // } else {
        //   setDate(0 + day.day);
        // }
        //   setDate(day.dateString);

        //   setMonthData(dayy);
        // }}
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
        HOLIDAYS IN {monthNameHook}
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
