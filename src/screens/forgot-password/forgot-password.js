import React, {useState} from 'react';
import {View, Image, Platform} from 'react-native';
import {Field} from 'redux-form';
import {Text, Screen, Button, Link} from '@components';
import {TextInputField} from '@components/form';
import styles from './forgot-password.style';

const ForgotPassword = props => {
  const {handleSubmit} = props;
  const [imageContainerHeight, setImageContainerHeight] = useState(0);

  function submit(values) {
    const {email} = values;

    const params = {
      email,
    };
  }

  return (
    <Screen
      ImageBackgorund={true}
      imageSource={require('@assets/icons/12.png')}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 30,
        }}>
        <Image
          source={require('@assets/icons/7.png')}
          style={{width: 140, height: 140}}
        />
      </View>
      <View style={styles.titleTopSpace} />

      <Text style={styles.welcomeTitle}>FORGET PASSWORD</Text>
      <View style={{flex: 1}} />
      <View style={{alignItems: 'center'}}>
        {/* <TextInputField /> */}
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

export default ForgotPassword;
