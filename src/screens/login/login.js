import React, { useState } from "react";
import { View, Image, Platform } from "react-native";
// import { Field } from "redux-form";
import { Text, Screen, Button, Link } from "@components";
import { TextInputField } from "@components/form";
import styles from "./login.style";

const Login = props => {
  // const { handleSubmit } = props;
  const [imageContainerHeight, setImageContainerHeight] = useState(0);

  function submit(values) {
    const { email, password } = values;

    const params = {
      email,
      password,
    };

    console.log('Params', params);
    // props.requestSchoolLogin(params);
  }

  return (
    <Screen>
      <View style={styles.titleTopSpace} />

      <Text scale style={styles.welcomeTitle}>
        LOGIN
      </Text>

      <View style={styles.titleBottomSpace} />

      <Text scale style={styles.briefing}>
        Briefings.....
      </Text>

      <View style={styles.breifingBottomSpace} />

      <View
        style={styles.imageContainer}
        onLayout={({
          nativeEvent: {
            layout: { height },
          },
        }) => {
          setImageContainerHeight(height);
        }}
      >
        <View>
          {/* <Image
            source={require("@assets/images/login-intro.png")}
            resizeMode='contain'
            style={{ height: imageContainerHeight, maxHeight: 300 }}
          />

          <Image
            style={styles.shapeCircle}
            source={require("@assets/images/login-shape-3.png")}
          /> */}
        </View>
      </View>

      <View style={styles.formTopSpace} />

      <View style={styles.formContainer}>
        {/* <Field
          component={TextInputField}
          name='email'
          label={t("login.emailLabel")}
          placeholder={t("login.emailPlaceholder")}
          keyboardType='email-address'
          autoCapitalize='none'
        /> */}

        <View style={styles.textInputSpace} />

        {/* <Field
          component={TextInputField}
          name='password'
          password
          label={t("login.passwordLabel")}
          placeholder={t("login.passwordPlaceholder")}
        /> */}

        <View style={styles.forgotPasswordTopSpace} />

        <Link
          primary
          text={"login.forgotPasswordLink"}
          // onPress={() => props.navigation.navigate("ResetPassword")}
        />

        <View style={styles.forgotPasswordBottomSpace} />

        <Button
          loading={props.isLoggingInSchool}
          primary
          title={"login.loginButtonTitle"}
          // onPress={handleSubmit(submit)}
          onPress={() => {}}
        />

        <View style={styles.buttonSpace} />

        {/* <Button
          // googleLogin
          icon={
            <Image
              source={require("@assets/images/google-login-button.png")}
            />
          }
          title={t("login.googleLoginButtonTitle")}
        /> */}
      </View>

      {/* <Image
        style={styles.shapeLeft}
        source={require("@assets/images/login-shape-1.png")}
      />

      <Image
        style={styles.shapeRight}
        source={require("@assets/images/login-shape-2.png")}
      /> */}
    </Screen>
  );
};

export default Login;