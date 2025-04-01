import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { loginProps } from "@/app/login";

const LoginFormSwitch: React.FC<loginProps> = ({
  isLoginScreen,
  setIsLoginScreen,
}) => {
  return (
    <View>
      <Text style={style.textDefault}>
        {!isLoginScreen ? "Already" : "Don't"} have an account?
      </Text>
      <TouchableOpacity onPress={() => setIsLoginScreen(!isLoginScreen)}>
        <Text style={[style.textDefault, style.textUnderline]}>
          Switch to {!isLoginScreen ? "login" : "register"} form
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  textDefault: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 400,
  },
  textUnderline: {
    textDecorationLine: "underline",
    color: "blue",
    textAlign: "center",
  },
});

export default LoginFormSwitch;
