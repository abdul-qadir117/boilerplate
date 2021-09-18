import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './navigationService';

// screens
import { AuthStack } from './AuthStack';
import BottomTabRouter from './bottomTabBarNavigator';
// import DrawerRouter from './drawerNavigator';

const Stack = createStackNavigator();

export class StackNavigator extends Component {
  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
    initialRouteName='Auth'
    screenOptions={{
      headerShown: false,
    }}
    screenOptions={{ headerMode: 'none' }}
  >
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name="TabBar"
            component={BottomTabRouter}
            options={{headerShown: false}}
          /> 
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
