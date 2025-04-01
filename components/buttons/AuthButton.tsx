import { Button, StyleSheet } from "react-native";
import React from "react";
import handleLogin from "@/components/auth/handleLogin";
import { useDispatch } from "react-redux";

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
}

const AuthButton: React.FC<AuthButtonProps> = ({
  isLoginScreen,
  data,
  setErrorMessage,
}) => {
  const dispatch = useDispatch();

  const handleAuthorization = async () => {
    if (isLoginScreen) {
      await handleLogin(data, setErrorMessage, dispatch);
    } else {
      // Handle register
    }
  };
  return (
    <Button
      title={isLoginScreen ? "Login" : "Register"}
      onPress={handleAuthorization}
    />
  );
};

// const style = StyleSheet.create({
//     bookBtn: {
//         width: 140,
//         padding: 10,
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: 12,
//         fontFamily: "Roboto",
//         fontSize: 12,
//         fontWeight: 400
//     }
// })

export default AuthButton;
