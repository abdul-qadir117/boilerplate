import React, {useState} from 'react';
import {View, Image, Platform} from 'react-native';
import {Text, Screen, Button, Link} from '@components';
import styles from './welcome-screen.style';

const WelcomeScreen = props => {
  const {firstName, lastName} = props.route.params;
  return (
    <Screen ImageBackground imageSource={require('@assets/icons/dots.png')}>
      <View style={{alignItems: 'center'}}>
        <Image
          style={styles.imageLogo}
          source={require('@assets/icons/logo.png')}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Image
          style={styles.mainIllustration}
          source={require('@assets/icons/4646.png')}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text style={styles.name}>{firstName}</Text>
        <Text style={styles.name}>{lastName}</Text>
      </View>
      <View style={{flex: 1}} />
      <View style={{width: 200, alignSelf: 'center', justifyContent: 'center'}}>
        <Button
          primary
          title={'continue'}
          onPress={() => props.navigation.navigate('TabBar')}
        />
      </View>
      <View style={{flex: 0.2}} />
    </Screen>
  );
};

export default WelcomeScreen;
