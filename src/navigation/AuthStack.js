import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';

import Login from '../screens/login/login';
// import ForgotPassword from '../screens/Forgot-Password';


// login flow
const Auth = createStackNavigator();
export const AuthStack = () => (
  <Auth.Navigator
    initialRouteName="Login"
    screenOptions={{
        animationEnabled: false,
        headerShown: false
    }}
    >
    <Auth.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
    {/* <Auth.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{headerShown: false}}
    /> */}
  </Auth.Navigator>
);
