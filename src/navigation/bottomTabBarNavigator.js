import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image} from 'react-native';
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
          title: 'Home',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('@assets/icons/home.png')}
              style={{width: 36, height: 36, tintColor: 'black'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventList}
        screenOptions={{headerMode: 'none', activeTintColor: '#000000'}}
        options={{
          headerMode: 'screen',
          title: 'Interventions',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('@assets/icons/calendar.png')}
              style={{width: 36, height: 36, tintColor: 'black'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Edit Profile"
        component={EventList}
        screenOptions={{headerMode: 'none', activeTintColor: '#000000'}}
        options={{
          headerMode: 'screen',
          title: 'Edit Profile',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('@assets/icons/editProfile.png')}
              style={{width: 36, height: 36, tintColor: 'black'}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
