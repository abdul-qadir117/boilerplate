import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Text, Screen, Button, TextInput} from '@components';
import styles from './password-updated.style';
import Icon from 'react-native-vector-icons/FontAwesome5';

const PasswordUpdated = props => {
  return (
    <Screen
      ImageBackgorund={true}
      imageSource={require('@assets/icons/12.png')}>
      <View style={{marginLeft: 20}}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon
            name={'arrow-left'}
            size={40}
            color={'white'}
            // style={styles.leftIcon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.welcomeTitle}>FORGET PASSWORD</Text>
      <View style={{flex: 1}} />
      <View
        style={{
          flex: 1,
          // backgroundColor: 'green',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <TextInput email /> */}
        <TextInput
          name="email"
          iconName="envelope"
          placeholder={'Email ID'}
          keyboardType="email-address"
          autoCapitalize="none"
          values={email}
          onChangeText={email => {
            setEmail(email);
          }}
        />
      </View>
      <View style={{flex: 1}} />
      <View style={{alignItems: 'center'}}>
        <Button
          loading={props.isLoggingInSchool}
          primary
          title={'Send Email'}
          onPress={() => props.navigation.goBack()}
        />
      </View>
      <View style={{flex: 1}} />
    </Screen>
  );
};

export default PasswordUpdated;
