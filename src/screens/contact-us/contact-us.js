import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {Screen, Button, TextInput} from '@components';
import {Header} from '../../components';

const ContactUs = () => {
  return (
    <Screen>
      <Header title={'Contact Us'} />
      <Text>Contact Us</Text>
    </Screen>
  );
};

export default ContactUs;
