import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "@/components/Themed";
import handleLogin from "@/components/auth/handleLogin";
import { useDispatch } from "react-redux";
import handleRegister from "@/components/auth/handleRegister";

export interface LoginDataProps {
  login: string;
  password: string;
}

export interface RegisterDataProps extends LoginDataProps {
  name: string;
  passwordConfirmation: string;
}

export interface AuthButtonProps {
  isLoginScreen: boolean;
  data: LoginDataProps | RegisterDataProps;
  setErrorMessage: (msg: string) => void;
  setIsLoginScreen: (isLoginScreen: boolean) => void;
  setPopup: (popup: boolean) => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  isLoginScreen,
  data,
  setErrorMessage,
  setIsLoginScreen,
  setPopup,
}) => {
  const dispatch = useDispatch();

  const isValidInputs = (data: LoginDataProps | RegisterDataProps): boolean => {
    if ("name" in data && "passwordConfirmation" in data) {
      if (
        !data.name ||
        !data.login ||
        !data.password ||
        !data.passwordConfirmation
      ) {
        if (!data.name) setErrorMessage("Name is required");
        else if (!data.login) setErrorMessage("Email is required");
        else if (!data.password) setErrorMessage("Password is required");
        else if (!data.passwordConfirmation)
          setErrorMessage("You must confirm the password");
        return false;
      }
    } else {
      if (!data.login || !data.password) {
        if (!data.login) setErrorMessage("Email is required");
        else if (!data.password) setErrorMessage("Password is required");
        return false;
      }
    }
    return true;
  };

  const handleAuthorization = async () => {
    if (isLoginScreen) {
      if (!isValidInputs(data)) return;
      await handleLogin(data, setErrorMessage, dispatch);
    } else {
      if ("name" in data && "passwordConfirmation" in data) {
        if (!isValidInputs(data)) return;
        await handleRegister(data, setErrorMessage, setIsLoginScreen, setPopup);
      } else {
        setErrorMessage("Invalid registration data");
      }
    }
  };
  return (
    <TouchableOpacity onPress={handleAuthorization} style={style.button}>
      <Text style={style.buttonText}>
        {isLoginScreen ? "Login" : "Register"}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    width: "100%",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6B4EFF",
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
});

export default AuthButton;
