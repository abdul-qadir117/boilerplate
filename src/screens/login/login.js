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

const Login = ({navigation}) => {
  // const { handleSubmit } = props;
  const [imageContainerHeight, setImageContainerHeight] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loadData = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // if (reg.test(email) === false) {
    //   setToastMessage('Email is Not Correct');

    //   return false;
    // } else {

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    fetch('https://tieredtracker.com/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(async response => {
        let data = await response.json();
        console.log(data.token);
        if (data.status_code === 200 && data.data.user.role === 'student') {
          navigation.navigate('TabBar', {token: data.token});
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.log('Something went wrong', error));
  };

  return (
    <Screen>
      <View style={styles.container}>
        {/* <CalendarComponent /> */}
        <View style={styles.headerContainer}>
          <ImageBackground
            style={styles.headerContainerImage}
            source={require('../../assets/icons/2.png')}>
            <Text style={{...styles.welcomeText, marginTop: 170}}>Welcome</Text>
            <Text style={styles.welcomeText}>Back</Text>
          </ImageBackground>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Email"
            value={email}
            onChangeText={e => setEmail(e)}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Password"
            value={password}
            onChangeText={e => setPassword(e)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.nextButtonContainer}>
              <TouchableOpacity
                onPress={() => loadData()}
                style={styles.nextButton}>
                <Icon name="angle-right" size={60} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
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

////////////////asdasd

// import React, {useState} from 'react';
// import {View, Image, Platform} from 'react-native';
// import {Field} from 'redux-form';
// import {Text, Screen, Button, Link} from '@components';
// import {TextInputField} from '@components/form';
// import styles from './login.style';

// const Login = props => {
//   const {handleSubmit} = props;
//   const [imageContainerHeight, setImageContainerHeight] = useState(0);

//   function submit(values) {
//     const {email, password} = values;

//     const params = {
//       email,
//       password,
//     };
//   }

//   return (
//     <Screen ImageBackgorund={true} imageSource={require('@assets/icons/2.png')}>
//       <View style={styles.titleTopSpace} />

//       <Text style={styles.welcomeTitle}>Welcome Back</Text>

//       <View style={styles.titleBottomSpace} />

//       <View style={styles.breifingBottomSpace} />

//       {/* <View
//         style={styles.imageContainer}
//         onLayout={({
//           nativeEvent: {
//             layout: {height},
//           },
//         }) => {
//           setImageContainerHeight(height);
//         }}>
//         <View>
//           <Image
//             source={require('@assets/images/login-intro.png')}
//             resizeMode="contain"
//             style={{height: imageContainerHeight, maxHeight: 300}}
//           />

//           <Image
//             style={styles.shapeCircle}
//             source={require('@assets/images/login-shape-3.png')}
//           />
//         </View>
//       </View> */}

//       <View style={styles.formTopSpace} />

//       <View style={styles.formContainer}>
//         {/* <Field
//           component={TextInputField}
//           name='email'
//           label={"login.emailLabel"}
//           placeholder={"login.emailPlaceholder"}
//           keyboardType='email-address'
//           autoCapitalize='none'
//         /> */}

//         <View style={styles.textInputSpace} />

//         {/* <Field
//           component={TextInputField}
//           name='password'
//           password
//           label={"login.passwordLabel"}
//           placeholder={"login.passwordPlaceholder"}
//         /> */}

//         <View style={styles.forgotPasswordTopSpace} />

//         <Link
//           primary
//           text={'login.forgotPasswordLink'}
//           onPress={() => props.navigation.navigate('ForgotPassword')}
//         />

//         <View style={styles.forgotPasswordBottomSpace} />

//         <Button
//           loading={props.isLoggingInSchool}
//           primary
//           title={'login.loginButtonTitle'}
//           onPress={() => props.navigation.navigate('WelcomeScreen')}
//         />

//         <View style={styles.buttonSpace} />
//       </View>

//       {/* <Image
//         style={styles.shapeLeft}
//         source={require('@assets/images/login-shape-1.png')}
//       />

//       <Image
//         style={styles.shapeRight}
//         source={require('@assets/images/login-shape-2.png')}
//       /> */}
//     </Screen>
//   );
// };

// export default Login;
