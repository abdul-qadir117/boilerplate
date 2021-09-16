import React from "react";
import { View } from "react-native";
import { withTranslation } from "react-i18next";
import i18n from "i18next";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import validator from "validator";
import {
  Screen,
  Header,
  Text,
  Button,
  TenantListItem,
  Link,
} from "@components";
import { TextInputField } from "@components/form";
import { UserCreators } from "@redux/actions";
import styles from "./reset-password.style";

let ResetPassword: () => React$Node = props => {
  const { t, handleSubmit } = props;
  const school = props.navigation.getParam("school");

  function submit(values) {
    const { email } = values;

    const params = {
      email,
    };

    props.requestResetPassword(params, school.access_token);
  }

  return (
    <Screen>
      <Header
        title={t("resetPassword.title")}
        leftIconName={"arrow-left"}
        onLeftButtonPress={() => props.navigation.goBack()}
      />

      <View style={styles.contentContainer}>
        <View style={styles.schoolTopSpace} />

        <TenantListItem
          selected
          title={school.name}
          subtitle={school.country_name}
        />

        <View style={styles.schoolBottomSpace} />

        <View style={styles.changeSchoolLinkContainer}>
          <Link
            text={t("login.changeSchoolLink")}
            onPress={() => props.navigation.pop(2)}
            primary
          />
        </View>

        <View style={styles.breifingTopSpace} />

        <Text style={styles.briefing}>
          {t("resetPassword.briefing")}
        </Text>

        <View style={styles.inputTopSpace} />

        <Field
          component={TextInputField}
          name='email'
          label={t("login.emailLabel")}
          placeholder={t("login.emailPlaceholder")}
          keyboardType='email-address'
          autoCapitalize='none'
        />

        <View style={styles.buttonContainer}>
          <Button
            loading={props.loadingState.isRequestingResetPassword}
            primary
            title={t("resetPassword.submitEmailButton")}
            containerStyle={styles.submitButton}
            onPress={handleSubmit(submit)}
          />
        </View>

        <View style={styles.bottomSpace} />
      </View>
    </Screen>
  );
};

const validate = (values, props) => {
  const errors = {};
  const { email } = values;

  if (!email || !validator.isEmail(email)) {
    errors.email = i18n.t("formErrors.invalidEmail");
  }

  return errors;
};

ResetPassword = reduxForm({
  form: "resetPassword",
  validate,
  touchOnChange: true,
  fields: ["email"],
})(ResetPassword);

ResetPassword = withTranslation()(ResetPassword);

function mapStateToProps(state) {
  return {
    loadingState: state.loadingState,
  };
}

const mapDispatchToProps = {
  requestResetPassword: UserCreators.requestResetPassword,
};

ResetPassword = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword);

export default ResetPassword;
