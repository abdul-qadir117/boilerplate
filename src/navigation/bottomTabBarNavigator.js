import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';

//Screens
import EventList from '../screens/event-list/event-list';
import CalendarComponent from '../screens/calendar/calendar-component';

const Tab = createBottomTabNavigator();

export default function BottomTabRouter() {
  return (
    <Tab.Navigator
      initialRouteName="CalendarComponent"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="CalendarComponent"
        component={CalendarComponent}
        screenOptions={{headerMode: 'none', activeTintColor: '#000000'}}
        options={{
          headerMode: 'screen',
          title: 'Interventions',
          tabBarIcon: ({color, size}) => (
            <Fontisto name="date" color={'black'} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventList}
        screenOptions={{headerMode: 'none', activeTintColor: '#000000'}}
        options={{
          headerMode: 'screen',
          title: 'Events',
          tabBarIcon: ({color, size}) => (
            <Fontisto name="home" color={'black'} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
