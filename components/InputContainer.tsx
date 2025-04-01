import React from "react";
import { Text, View } from "@/components/Themed";
import { TextInput, StyleSheet } from "react-native";
interface inputContainerProps {
  placeholderValue: string;
  children: React.ReactNode;
  setData: (data: string) => void;
  setErrorMessage: (errMsg: string) => void;
}

const InputContainer: React.FC<inputContainerProps> = ({
  placeholderValue,
  children,
  setData,
  setErrorMessage,
}) => {
  return (
    <View style={style.inputContainerWrapper}>
      <Text style={style.inputTitle}>{children}</Text>
      <TextInput
        placeholder={placeholderValue}
        style={style.inputContainer}
        onChangeText={(text) => {
          setData(text);
          setErrorMessage("");
        }}
        secureTextEntry={
          typeof children === "string" &&
          children.toLowerCase().includes("password")
        }
      ></TextInput>
    </View>
  );
};

const style = StyleSheet.create({
  inputContainerWrapper: {
    gap: 6,
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
    padding: 8,
  },
});

export default InputContainer;
