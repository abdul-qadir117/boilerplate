import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import Login from '../screens/login/login';
import CalendarComponent from '../screens/calendar/calendar-component';
// import ForgotPassword from '../screens/Forgot-Password';

// login flow
const Auth = createStackNavigator();
export const AuthStack = () => (
  <Auth.Navigator
    initialRouteName="Login"
    screenOptions={{
      animationEnabled: false,
      headerShown: false,
    }}>
    <Auth.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
    <Auth.Screen
      name="CalendarComponent"
      component={CalendarComponent}
      options={{headerShown: false}}
    />
  </Auth.Navigator>
);
