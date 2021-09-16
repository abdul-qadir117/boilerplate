import React, { useState } from "react";
import { View } from "react-native";
import { withTranslation } from "react-i18next";
import {
  Screen,
  Header,
  Text,
  Button,
  SchoolList,
} from "@components";
import styles from "./login-school.style";

const ResetPasswordSchool: () => React$Node = props => {
  const [selectedSchool, setSelectedSchool] = useState();
  const { t } = props;

  function onSelectSchool(school) {
    setSelectedSchool(school);
  }

  function onSubmit() {
    const user = props.navigation.getParam("user");

    const params = {
      email: user.email,
      password: user.password,
      device: {
        deviceId: "ZXCVB123",
        platform: "android",
      },
      schoolApiAccessToken: selectedSchool.api_access_token,
    };

    props.requestSchoolLogin(params);
  }

  return (
    <Screen>
      <Header
        title={t("loginSchool.title")}
        leftIconName={"arrow-left"}
        onLeftButtonPress={() => props.navigation.goBack()}
      />

      <View style={styles.contentContainer}>
        <Text style={styles.briefing}>
          {t("loginSchool.briefing")}
        </Text>

        <SchoolList
          data={props.navigation.getParam("schools")}
          onSelectSchool={onSelectSchool}
          ListFooterComponent={
            <Button
              loading={props.isLoggingInSchool}
              disabled={!selectedSchool}
              primary
              containerStyle={styles.button}
              title={t("loginSchool.submitSchoolButton")}
              onPress={onSubmit}
            />
          }
        />
      </View>
    </Screen>
  );
};

export default withTranslation()(ResetPasswordSchool);
