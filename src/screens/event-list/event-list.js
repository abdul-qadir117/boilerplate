import React, { useState } from "react";
import { View, Image, Platform } from "react-native";
import { Text, Screen, Button, Link } from "@components";
import { Header } from "../../components";
import {Timeline} from 'react-native-just-timeline';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from '@react-navigation/compat';
import data from './timeline.data';
import styles from './event-list.style';



const EventList = props => {

  return (
    <Screen>
              <Header
                  leftIconName={"bars"}
                  title={"EVENTS LIST"}
                  searchBar
                  saveIcon
                  addEventIcon
              />
              <View style={styles.monthView}>
        <Icon name={'chevron-left'} size={18} style={styles.leftIcon} />
        <Text style={styles.monthText}>Jan, 2021</Text>
        <Icon name={'chevron-right'} size={18} style={styles.rightIcon} />
      </View>
      <Timeline data={data} style={{marginTop: 20}} />
    </Screen>
  );
};

export default EventList;
