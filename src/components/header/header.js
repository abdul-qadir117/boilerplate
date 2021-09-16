import React from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { withTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "@config";
import { Text, SearchBar, Link } from "../";
import styles from "./header.style";

let Header: () => React$Node = props => {
  const { t } = props;
  let inputRef;

  const onPressCancelSearch = () => {
    // this.inputRef.clear();
    inputRef.blur();
    props.onPressCancelSearch && props.onPressCancelSearch();
  };

  return (
    <View
      style={[
        styles.container,
        props.hideShadow ? undefined : styles.shadow,
      ]}
    >
      {!props.hideTitle ? <View style={styles.topSpace} /> : null}

      {props.leftIconName || props.rightButtonText ? (
        <View style={styles.buttonsContainer}>
          {props.leftIconName ? (
            <TouchableOpacity
              onPress={() =>
                props.onLeftButtonPress && props.onLeftButtonPress()
              }
            >
              <Icon
                name={props.leftIconName}
                size={21}
                color={COLOR.HEADER_ICON}
                style={styles.leftIcon}
              />
            </TouchableOpacity>
          ) : null}

          <View style={styles.buttonsSpace} />

          {props.rightButtonText ? (
            <View style={styles.rightButtonContainer}>
              {props.isRightButtonBusy ? (
                <ActivityIndicator size='small' color='#1886DF' />
              ) : (
                <Link
                  onPress={() =>
                    props.onRightButtonPress && props.onRightButtonPress()
                  }
                  primary
                  text={props.rightButtonText}
                />
              )}
            </View>
          ) : null}

          {}
        </View>
      ) : null}

      {!props.hideTitle && props.title ? (
        <Text
          scale
          style={[
            styles.title,
            props.smallTitle ? styles.smallTitle : undefined,
          ]}
        >
          {props.title}
        </Text>
      ) : null}

      {props.searchBar ? (
        <View style={styles.searchBarContainer}>
          <SearchBar
            containerStyle={styles.searchInputContainer}
            getInputRef={ref => {
              inputRef = ref;
            }}
            {...props.searchInputProps}
          />

          {props.showCancelSearchButton ? (
            <View style={styles.cancelButtonContainer}>
              <Link
                primary
                text={t("headerActionButtons.cancelSearch")}
                onPress={onPressCancelSearch}
              />
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

Header = withTranslation()(Header);

export { Header };
