import React, { useState } from "react";
import { View, Image, Platform, Alert } from "react-native";
import { Field } from "redux-form";
import { AppleButton } from "@invertase/react-native-apple-authentication";
import { Screen, Button, Link, TenantListItem } from "@components";
import DeviceInfo from "react-native-device-info";
import Config from "react-native-config";
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from "@invertase/react-native-apple-authentication";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-community/google-signin";
import { TextInputField } from "@components/form";
import styles from "./login-v2.style";

const Login: () => React$Node = props => {
  const { t, handleSubmit } = props;
  const [isWaitingAppleAuth, setIsWaitingAppleAuth] = useState(false);
  const school = props.navigation.getParam("school");

  function submit(values) {
    const { email, password } = values;

    const params = {
      user: {
        email,
        password,
        device_info: {
          pn_registration_id: DeviceInfo.getUniqueId(),
          platform: Platform.OS,
        },
      },
      schoolApiAccessToken: school.access_token,
    };

    props.requestLogin(params);
  }

  const loginWithGoogle = async () => {
    await GoogleSignin.configure({
      webClientId: Config.GOOGLE_WEB_CLIENT_ID,
      iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
      offlineAccess: true,
    });

    try {
      const userInfo = await GoogleSignin.signIn();
      const params = {
        code: userInfo.serverAuthCode,
        device_info: {
          pn_registration_id: DeviceInfo.getUniqueId(),
          platform: Platform.OS,
        },
        schoolApiAccessToken: school.access_token,
      };
      props.requestGoogleLogin(params);
      GoogleSignin.signOut();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  async function onAppleButtonPress() {
    try {
      setIsWaitingAppleAuth(true);
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest(
        {
          requestedOperation: AppleAuthRequestOperation.LOGIN,
          requestedScopes: [
            AppleAuthRequestScope.EMAIL,
            AppleAuthRequestScope.FULL_NAME,
          ],
        },
      );

      // get current authentication state for user
      let credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
      setIsWaitingAppleAuth(false);

      // use credentialState response to ensure the user is authenticated
      if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
        const params = {
          code: appleAuthRequestResponse.authorizationCode,
          device_info: {
            pn_registration_id: DeviceInfo.getUniqueId(),
            platform: Platform.OS,
          },
          schoolApiAccessToken: school.access_token,
        };
        props.requestAppleLogin(params);
      }
    } catch (error) {
      setIsWaitingAppleAuth(false);
      if (error.code !== "1001") {
        Alert.alert(error && error.message);
      }
    }
  }

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.topSpace} />

        <Image
          source={require("@assets/images/welcome-logo.png")}
          style={styles.logo}
        />

        <View style={styles.logoBottomSpace} />

        <TenantListItem
          title={school.name}
          subtitle={school.country_name}
        />

        <View style={styles.schoolBottomSpace} />

        <View style={styles.changeSchoolLinkContainer}>
          <Link
            text={t("login.changeSchoolLink")}
            onPress={() => props.navigation.goBack()}
            primary
          />
        </View>

        <View style={styles.emailInputTopSpace} />

        <Field
          component={TextInputField}
          name='email'
          label={t("login.emailLabel")}
          placeholder={t("login.emailPlaceholder")}
          keyboardType='email-address'
          autoCapitalize='none'
          returnKeyType='next'
          onSubmitEditing={() => {
            this.passwordInput.inputRef.focus();
            // this.passwordInput.refs.input.focus();
          }}
        />

        <View style={styles.passwordTopSpace} />

        <Field
          component={TextInputField}
          name='password'
          password
          label={t("login.passwordLabel")}
          placeholder={t("login.passwordPlaceholder")}
          refName={ref => this.passwordInput = ref}
          returnKeyType='next'
          withRef
          forwardRef
          onSubmitEditing={handleSubmit(submit)}
        />

        <View style={styles.forgotPasswordContainer}>
          <Link
            primary
            text={t("login.forgotPasswordLink")}
            onPress={() =>
              props.navigation.navigate("ResetPassword", { school })
            }
          />
        </View>

        <View style={styles.forgotPasswordBottomSpace} />

        <Button
          loading={props.isLoggingIn}
          disabled={props.isLoggingInWithGoogle || props.isLoggingInWithApple || isWaitingAppleAuth}
          primary
          title={t("login.loginButtonTitle")}
          onPress={handleSubmit(submit)}
        />

        <View style={styles.buttonSpace} />

        <Button
          loading={props.isLoggingInWithGoogle}
          disabled={props.isLoggingIn || props.isLoggingInWithApple || isWaitingAppleAuth}
          googleLogin
          icon={
            <Image
              source={require("@assets/images/google-login-button.png")}
            />
          }
          title={t("login.googleLoginButtonTitle")}
          onPress={loginWithGoogle}
        />

        {Platform.OS === "ios" &&
        parseInt(Platform.Version, 10) >= 13 ? (
          <>
            <View style={styles.buttonSpace} />

            {/*<Button
              loading={props.isLoggingInWithApple || isWaitingAppleAuth}
              disabled={props.isLoggingIn || props.isLoggingInWithGoogle}
              googleLogin
              icon={
                <Image
                  source={require("@assets/images/apple-login.png")}
                />
              }
              title={t("login.appleLoginButtonTitle")}
              onPress={() => onAppleButtonPress()}
            />*/}
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={{
                width: "100%",
                height: 36,
              }}
              cornerRadius={8}
              onPress={() => onAppleButtonPress()}
            />
          </>
        ) : null}

        <View style={styles.bottomSpace} />
      </View>
    </Screen>
  );
};

export default Login;
