import { Button, StyleSheet } from "react-native";
import React from "react";
import { loginProps } from "@/app/login";

const AuthButton: React.FC<loginProps> = ({ isLoginScreen }) => {
  const handleAuthorization = () => {
    //TODO: make API request to authorize
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
