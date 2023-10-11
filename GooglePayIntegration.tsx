import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  PixelRatio,
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  Button,
  TouchableOpacity,
  CheckBox,
  Switch,
  Platform,
  Image,
  TextInput,
  Picker,
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from "react-native-simple-radio-button";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import GooglePayIntegrationController, {
  Props,
  configJSON,
} from "./GooglePayIntegrationController";
import { COLORS } from "../../../framework/src/Globals";

export default class GooglePayIntegration extends GooglePayIntegrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <View style={styles.container}>
        <TextInput
          testID="amountInput"
          style={styles.enterAmountStyle}
          value={this.state.amountValue}
          onChangeText={(value) => this.handleAmountInput(value)}
          placeholder="Enter Amount"
          keyboardType="number-pad"
        />
        <TouchableOpacity
          testID="payNowID"
          style={styles.payButton}
          onPress={this.subscribePurchase}
        >
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  enterAmountStyle: {
    width: "100%",
    backgroundColor: COLORS.white,
    padding: 20,
    fontFamily: "Jost-Regular",
  },
  payButton: {
    width: "100%",
    height: responsiveHeight(5),
    backgroundColor: COLORS.darkGray,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    fontFamily: "Jost-Regular",
    color: COLORS.white,
  },
});
// Customizable Area End
