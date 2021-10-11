import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//Screens
import EventList from '../screens/event-list/event-list';
import CalendarComponent from '../screens/calendar/calendar-component';
import ContactUs from '../screens/contact-us/contact-us';
import EditProfile from '../screens/edit-profile/edit-profile';

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
            // <Image
            //   source={require('@assets/icons/calendar.png')}
            //   style={{width: 36, height: 36, tintColor: 'black'}}
            // />
            <FontAwesome name="calendar-check-o" size={30} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Edit Profile"
        component={EditProfile}
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
      <Tab.Screen
        name="Contact Us"
        component={ContactUs}
        screenOptions={{headerMode: 'none', activeTintColor: '#000000'}}
        options={{
          headerMode: 'screen',
          title: 'Contact Us',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('@assets/icons/calendar.png')}
              style={{width: 36, height: 36, tintColor: 'black'}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
