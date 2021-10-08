import React, {useState} from 'react';
import {View, Image, Platform, TextInput, TouchableOpacity} from 'react-native';
import {Text, Screen, Button, Link} from '@components';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './card.style';

const CardComponent = ({text, name, time, date}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.nameContainer}>
        <Text style={styles.headerText}>{text}</Text>
        <Text style={{...styles.headerText, fontWeight: '700'}}> {name}</Text>
      </View>
      <View style={styles.dateTimeContainer}>
        {/* <Text style={styles.dateTimeText}>{time}</Text> */}
        <Text style={styles.dateTimeText}>{date}</Text>
      </View>
    </View>
  );
};

export default CardComponent;
