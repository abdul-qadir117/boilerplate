import React, {useState} from 'react';
import {View, Image, Platform} from 'react-native';
import {Text, Screen, Button, Link} from '@components';
import {Header} from '../../components';
import {Timeline} from 'react-native-just-timeline';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {withNavigation} from '@react-navigation/compat';
import data from './timeline.data';
import styles from './event-list.style';

const EventList = props => {
  return (
    <Screen>
      <Header
        leftIconName={'bars'}
        title={'EVENTS LIST'}
        searchBar
        saveIcon
        addEventIcon
      />
      <View style={styles.monthView}>
        <Text style={styles.leftIcon}>Sort by:</Text>
        <View style={{flex: 1}} />
        <Text style={styles.monthText}>March, 2021</Text>
        <Icon
          name={'chevron-down'}
          size={18}
          style={styles.rightIcon}
          color={'grey'}
        />
        <View style={{flex: 1}} />
      </View>

      <Timeline data={data} style={{marginTop: 20}} />
    </Screen>
  );
};

export default EventList;
