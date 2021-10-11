import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {Screen, Button, TextInput} from '@components';
import {Header} from '../../components';

const EditProfile = () => {
  return (
    <Screen>
      <Header title={'Edit Profile'} />
      <Text>Edit Profile</Text>
    </Screen>
  );
};

export default EditProfile;
