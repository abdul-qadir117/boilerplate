import React from 'react';
import {SafeAreaView, ImageBackground} from 'react-native';
import styles from './screen.style';

const Screen = props => {
  return props.ImageBackground ? (
    <SafeAreaView style={[styles.container, props.style]}>
      {props.children}
    </SafeAreaView>
  ) : (
    <ImageBackground source={props.imageSource} style={styles.imageBackground}>
      <SafeAreaView style={[styles.container, props.style]}>
        {props.children}
      </SafeAreaView>
    </ImageBackground>
  );
};

export {Screen};
