import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
} from 'react-native';
import {Text} from '../src/components/text'



const App = props => {
  
  return (
    <SafeAreaView>
      <View
          style={{
            backgroundColor: 'white',
          }}>
        <Text style={{  fontFamily: 'Lato',fontSize: 28, marginLeft: 20,}}>Boilerplate</Text>
         
        </View>
    </SafeAreaView>
  );
};



export default App;
