import React from "react";
import { Text, View } from "@/components/Themed";
import { TextInput, StyleSheet } from "react-native";
interface inputContainerProps {
  placeholderValue: string;
  children: React.ReactNode;
}

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

const style = StyleSheet.create({
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

export default InputContainer;
