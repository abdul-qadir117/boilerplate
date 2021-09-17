import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

// Screens
import EventList from '../screens/event-list/event-list';
// import BoxScreen from '../screens/boxScreen';
// import CartScreen from '../screens/cartScreen';
// import SkuScreen from '../screens/skuScreen';

const TestTab = props => {
    return (
        <View>
            <Text>
                THis is a test tab please change to component location
            </Text>
        </View>
    )
}

const TestTab2 = props => {
    return (
        <View>
            <Text>
                Tab 2
            </Text>
        </View>
    )
}

const TestTab3 = props => {
    return (
        <View>
            <Text>
                Tab 3
            </Text>
        </View>
    )
}

const Tab = createBottomTabNavigator();

export default function BottomTabRouter() {
  return (
    <Tab.Navigator
      initialRouteName="SKU"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
      >
        <Tab.Screen name="View" component={TestTab}  options={{
        tabBarLabel: 'BoxScreen',
        
      }}/>
      
      <Tab.Screen name="SKU" component={EventList}
      options={{
        tabBarLabel: 'Events',
        
      }}
      />
      <Tab.Screen name="Cart" component={TestTab3}  options={{
        tabBarLabel: 'CART',
        
      }}/>
      

    </Tab.Navigator>
  );
}
