import React from 'react';
import {SafeAreaView, ImageBackground, Text} from 'react-native';
import styles from './screen.style';

const Screen = props => {
  return props.ImageBackground ? (
    <ImageBackground
      source={require('@assets/images/bg.png')}
      style={styles.imageBackground}>
      <SafeAreaView style={[styles.container, props.style]}>
        {props.children}
        <Text>asdasdkl</Text>
      </SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[styles.container, props.style]}>
      <Text>asda12321321321sdkl</Text>
      {props.children}
    </SafeAreaView>
  );
};

export {Screen};
