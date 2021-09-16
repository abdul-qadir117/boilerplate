// import React from "react";
// import { View, Dimensions } from "react-native";
// import { getStatusBarHeight } from "react-native-status-bar-height";
// import RBSheet from "react-native-raw-bottom-sheet";
// import { ModalHeader } from "../";
// import styles from "./bottom-sheet.style";
// const { height: screenHeight } = Dimensions.get("window");
// const MARGIN_TOP = 20;

// class BottomSheet extends React.Component {
//   componentDidMount() {
//     this.RBSheet.open();
//   }

//   onRightButtonPress = () => {
//     this.RBSheet.close();
//     this.props.onRightButtonPress();
//   };

//   render() {
//     return (
//       <RBSheet
//         ref={ref => {
//           this.RBSheet = ref;
//         }}
//         height={screenHeight - MARGIN_TOP - getStatusBarHeight()}
//         closeOnDragDown={false}
//         customStyles={{
//           container: {
//             borderTopLeftRadius: 10,
//             borderTopRightRadius: 10,
//             overflow: "hidden",
//           },
//         }}
//         onClose={this.props.onClose}
//       >
//         <View style={styles.contentContainer}>
//           <ModalHeader
//             title={this.props.title}
//             leftIconName={"times"}
//             onLeftButtonPress={() => this.RBSheet.close()}
//             rightButtonText={this.props.rightButtonText}
//             onRightButtonPress={this.onRightButtonPress}
//           />

//           {this.props.children}
//         </View>
//       </RBSheet>
//     );
//   }
// }

// export { BottomSheet };
