import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import {
  GooglePay,
  AllowedCardNetworkType,
  AllowedCardAuthMethodsType,
  RequestDataType,
} from "react-native-google-pay";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  allowedCardNetworks: AllowedCardNetworkType[];
  allowedCardAuthMethods: AllowedCardAuthMethodsType[];
  amountValue: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class GooglePayIntegrationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      // Customizable Area End
    ];
    // Customizable Area End

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      allowedCardAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
      allowedCardNetworks: ["VISA", "MASTERCARD"],
      amountValue: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    message.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(message);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  handleAmountInput = (value: string) => {
    this.setState({ amountValue: value });
  };
  subscribePurchase = () => {
    if (this.state.amountValue.length === 0) {
      return this.showAlert(configJSON.error, configJSON.amountErrorMessage);
    }
    const requestData: RequestDataType = {
      cardPaymentMethod: {
        tokenizationSpecification: {
          type: configJSON.tokenizationSpecificationType,
          gateway: configJSON.gateway,
          gatewayMerchantId: configJSON.merchantId,
          stripe: {
            publishableKey: configJSON.stripePublishableKey,
            version: configJSON.stripeVersion,
          },
        },
        allowedCardNetworks: this.state.allowedCardNetworks,
        allowedCardAuthMethods: this.state.allowedCardAuthMethods,
      },
      transaction: {
        totalPrice: this.state.amountValue,
        totalPriceStatus: configJSON.transactionTotalPriceStatus,
        currencyCode: configJSON.currencyCode,
      },
      merchantName: configJSON.merchantName,
    };
    // Set the environment before the payment request
    GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
    // Check if Google Pay is available
    GooglePay.isReadyToPay(
      this.state.allowedCardNetworks,
      this.state.allowedCardAuthMethods
    ).then((ready) => {
      if (ready) {
        // Request payment token
        GooglePay.requestPayment(requestData)
          .then((token: string) => {
            // Send a token to your payment gateway
            this.showAlert(
              configJSON.successMessage,
              `${configJSON.successMessage1} with the amount ${this.state.amountValue} ${configJSON.currencyCode}!! Thanks For the payment!!`
            );
            // success message will be come here
          })
          .catch((error) =>
            this.showAlert(
              JSON.stringify(error.code),
              JSON.stringify(error.message)
            )
          );
      }
    });
  };
  // Customizable Area End
}
