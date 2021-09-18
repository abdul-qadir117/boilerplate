import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';

import Login from '../screens/login';
import ForgotPassword from '../screens/forgot-password';
import WelcomeScreen from '../screens/welcome';

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
      name="ForgotPassword"
      component={ForgotPassword}
      options={{headerShown: false}}
    />
    <Auth.Screen
      name="WelcomeScreen"
      component={WelcomeScreen}
      options={{headerShown: false}}
    />
  </Auth.Navigator>
);
