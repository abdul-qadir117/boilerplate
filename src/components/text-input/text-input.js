import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TextInput as RNTextInput,
  Image,
} from "react-native";
import { COLOR } from "@config";
import { Text } from "../";
import styles from "./text-input.style";

class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSecureTextEntry: props.password,
    };
  }

  render() {
    const {
      error,
      password,
      label,
      value,
      hideErrorContainer,
      ...rest
    } = this.props;

    return (
      <View style={styles.container}>
        {label ? (
          <Text style={styles.label}>{label}</Text>
        ) : null}

        <TouchableOpacity
          style={[
            styles.inputContainer,
            error ? styles.errorContainer : {},
          ]}
          onPress={() => this.inputRef.focus()}
          activeOpacity={1}
        >
          <RNTextInput
            {...rest}
            ref={ref => {
              this.inputRef = ref;
            }}
            style={styles.input}
            value={value}
            onChangeText={this.props.onChangeText}
            placeholderTextColor={COLOR.TEXT_INPUT_PLACEHOLDER}
            secureTextEntry={this.state.isSecureTextEntry}
          />

          {password ? (
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  isSecureTextEntry: !this.state.isSecureTextEntry,
                })
              }
            >
              <Image
                source={require("@assets/images/eye-slash.png")}
              />
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>

        {!hideErrorContainer ? (
          <View style={styles.errorMessageContainer}>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

export { TextInput };
