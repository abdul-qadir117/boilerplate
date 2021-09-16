import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text, Screen, TextInput } from "@components";
import styles from "./welcome.style";

const Welcome: () => React$Node = props => {
  const { t } = props;

  return (
    <Screen>
      <View style={styles.logoTopSpace} />

      <Image
        source={require("@assets/images/welcome-logo.png")}
        style={styles.logo}
      />

      <View style={styles.titleTopSpace} />

      <Text scale style={styles.welcomeTitle}>
        {t("welcome.title")}
      </Text>

      <View style={styles.titleTopSpace} />

      <View style={styles.imageContainer}>
        <Image source={require("@assets/images/welcome-intro.png")} />
      </View>

      <View style={styles.imageBottomSpace} />

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => props.navigation.navigate("LoginSchoolSearch")}
      >
        <View pointerEvents='none'>
          <TextInput
            label={t("welcome.inputLabel")}
            placeholder={t("welcome.inputPlaceholder")}
            editable={false}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.bottomSpace} />

      <Image
        style={styles.shapeLeft}
        source={require("@assets/images/login-shape-1.png")}
      />

      <Image
        style={styles.shapeRight}
        source={require("@assets/images/login-shape-2.png")}
      />

      <Image
        style={styles.shapeCircle}
        source={require("@assets/images/login-shape-3.png")}
      />
    </Screen>
  );
};

export default Welcome;
