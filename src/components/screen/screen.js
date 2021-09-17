import React from "react";
import { SafeAreaView } from "react-native";
import styles from "./screen.style";

const Screen = props => {
  return (
      <SafeAreaView style={[styles.container, props.style]}>
        {props.children}
      </SafeAreaView>
  );
};

export { Screen };
