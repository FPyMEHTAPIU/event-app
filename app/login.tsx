import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import AuthButton from "@/components/buttons/AuthButton";
import LoginFormSwitch from "@/components/LoginFormSwitch";
import InputContainer from "@/components/InputContainer";

export interface loginScreenProps {
  isLoginScreen: boolean;
  setIsLoginScreen: (isLoginScreen: boolean) => void;
}

const LoginScreen = () => {
  const [isLoginScreen, setIsLoginScreen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userData, setUserData] = useState({
    login: "",
    password: "",
    passwordConfirmation: "",
    name: "",
  });

  const getOneFieldSetter = (key: keyof typeof userData) => {
    return (value: string) =>
      setUserData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View style={style.mainContainer}>
      <Text style={style.mainTitleText}>
        {isLoginScreen ? "Log in" : "Register"}
      </Text>
      <View style={style.wrapperContainer}>
        {!isLoginScreen && (
          <InputContainer
            placeholderValue={"What's your name?"}
            setData={getOneFieldSetter("name")}
          >
            Your name
          </InputContainer>
        )}
        <InputContainer
          placeholderValue={"email@box.com"}
          setData={getOneFieldSetter("login")}
        >
          Your email
        </InputContainer>
        <InputContainer
          placeholderValue={"At least 8 characters"}
          setData={getOneFieldSetter("password")}
        >
          Enter password
        </InputContainer>
        {!isLoginScreen && (
          <InputContainer
            placeholderValue={"Repeat the password"}
            setData={getOneFieldSetter("passwordConfirmation")}
          >
            Re-enter password
          </InputContainer>
        )}
        <LoginFormSwitch
          isLoginScreen={isLoginScreen}
          setIsLoginScreen={setIsLoginScreen}
        />
      </View>
      <View style={style.buttonErrorContainer}>
        {errorMessage.length > 0 && (
          <Text style={style.errorText}>{errorMessage}</Text>
        )}
        <View>
          <AuthButton
            isLoginScreen={isLoginScreen}
            data={userData}
            setErrorMessage={setErrorMessage}
          />
        </View>
      </View>
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
  buttonErrorContainer: {
    gap: 8,
  },
  errorText: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: 400,
    color: "red",
  },
});

export default LoginScreen;
