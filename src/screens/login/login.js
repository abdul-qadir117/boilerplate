import React, {useState} from 'react';
import {View, Image, Platform, TextInput, TouchableOpacity} from 'react-native';
import {Text, Screen, Button, Link} from '@components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TextInputField} from '@components/form';
import styles from './login.style';
import CalendarComponent from '../calendar/calendar-component';

const Login = props => {
  // const { handleSubmit } = props;
  const [imageContainerHeight, setImageContainerHeight] = useState(0);

  function submit(values) {
    const {email, password} = values;

    const params = {
      email,
      password,
    };

    console.log('Params', params);
    // props.requestSchoolLogin(params);
  }

  return (
    <Screen>
      <View style={styles.container}>
        <CalendarComponent />
        {/* <View style={styles.headerContainer}></View>
        <View style={styles.formContainer}>
          <TextInput style={styles.inputField} placeholder="Email" />
          <TextInput style={styles.inputField} placeholder="Password" />
          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.nextButtonContainer}>
              <TouchableOpacity style={styles.nextButton}>
                <Icon name="angle-right" size={60} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.forgetPassword}>Forget Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> */}
      </View>
    </Screen>
  );
};

export default Login;
