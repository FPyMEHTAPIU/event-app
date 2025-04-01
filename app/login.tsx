import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import AuthButton from "@/components/buttons/AuthButton";
import LoginFormSwitch from "@/components/LoginFormSwitch";
import InputContainer from "@/components/InputContainer";

export interface loginProps {
  isLoginScreen: boolean;
  setIsLoginScreen: (isLoginScreen: boolean) => void;
}

const LoginScreen = () => {
  const [isLoginScreen, setIsLoginScreen] = useState<boolean>(false);

  return (
    <View style={style.mainContainer}>
      <Text style={style.mainTitleText}>
        {isLoginScreen ? "Log in" : "Register"}
      </Text>
      <LoginFormSwitch
        isLoginScreen={isLoginScreen}
        setIsLoginScreen={setIsLoginScreen}
      />
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
        <InputContainer placeholderValue={"Repeat the password"}>
          Re-enter password
        </InputContainer>
      </View>
      <AuthButton
        isLoginScreen={isLoginScreen}
        setIsLoginScreen={setIsLoginScreen}
      />
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
});

export default LoginScreen;
