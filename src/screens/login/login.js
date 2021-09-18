import React, {useState} from 'react';
import {
  View,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
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
        <StatusBar backgroundColor="black" barStyle="dark-content" />
        {/* <CalendarComponent /> */}
        <View style={styles.headerContainer}>
          <ImageBackground
            style={styles.headerContainerImage}
            source={require('../../assets/images/loginBackground.png')}>
            <Text style={{...styles.welcomeText, marginTop: 170}}>Welcome</Text>
            <Text style={styles.welcomeText}>Back</Text>
          </ImageBackground>
        </View>
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
        </View>
      </View>
    </Screen>
  );
};

export default Login;
