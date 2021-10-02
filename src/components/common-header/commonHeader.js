import React, {useState} from 'react';
import {View, Image, Platform, TextInput, TouchableOpacity} from 'react-native';
import {Text, Screen, Button, Link} from '@components';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './common-header.style';

const CommonHeader = ({title}) => {
  return (
    <View style={styles.headerContainer}>
      <Icon name="left" size={25} color="white" />
      <Text style={styles.headerText}>{title}</Text>
      <View></View>
      {/* <Icon name="pluscircleo" size={35} color="white" /> */}
    </View>
  );
};

export default CommonHeader;
