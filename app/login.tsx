import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import AuthButton from "@/components/AuthButton";

interface inputContainerProps {
  placeholderValue: string;
  children: React.ReactNode;
}

export interface loginProps {
  isLoginScreen: boolean;
  setIsLoginScreen: (isLoginScreen: boolean) => void;
}

const LoginFormSwitch: React.FC<loginProps> = ({
  isLoginScreen,
  setIsLoginScreen,
}) => {
  return (
    <>
      <TouchableOpacity>
        <Text>
          {!isLoginScreen
            ? "Already have an account?\nSwitch to login form"
            : "Don't have an account?\nSwitch to register form"}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const InputContainer: React.FC<inputContainerProps> = ({
  placeholderValue,
  children,
}) => {
  return (
    <View>
      <Text style={style.inputTitle}>{children}</Text>
      <TextInput
        placeholder={placeholderValue}
        style={style.inputContainer}
      ></TextInput>
    </View>
  );
};

const LoginScreen = () => {
  const [isLoginScreen, setIsLoginScreen] = useState<boolean>(false);

  return (
    <View style={style.mainContainer}>
      <Text style={style.mainTitleText}>
        {isLoginScreen ? "Log in" : "Register"}
      </Text>
      <LoginFormSwitch isLoginScreen={isLoginScreen} />
      <View style={style.wrapperContainer}>
        <InputContainer placeholderValue={"What's your name?"}>
          Your name
        </InputContainer>
        <InputContainer placeholderValue={"email@box.com"}>
          Your email
        </InputContainer>
        <InputContainer placeholderValue={"At least 8 characters"}>
          Enter password
        </InputContainer>
        <InputContainer placeholderValue={""}>Re-enter password</InputContainer>
      </View>
      <AuthButton isLoginScreen={isLoginScreen} />
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 100,
  },
  mainTitleText: {
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "bold",
  },
  wrapperContainer: {
    flexDirection: "column",
    gap: 16,
  },
  inputTitle: {
    fontFamily: "Roboto",
    fontSize: 18,
  },
  inputContainer: {
    fontFamily: "Roboto",
    fontSize: 18,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    width: 300,
  },
});

export default LoginScreen;
