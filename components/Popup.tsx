import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import React from "react";

interface PopupProps {
  slots: {
    title?: React.ReactNode;
    description?: React.ReactNode;
    buttonText?: React.ReactNode;
    secondButtonText?: React.ReactNode;
  };
}

const Popup: React.FC<PopupProps> = ({ slots }) => (
  <View style={style.background}>
    <View style={style.popupContainer}>
      <View style={style.textContainer}>
        {slots.title && <Text style={style.title}>{slots.title}</Text>}
        {slots.description && (
          <Text style={style.description}>{slots.description}</Text>
        )}
      </View>
      <View style={style.buttonContainer}>
        {slots.buttonText && (
          <TouchableOpacity style={style.button}>
            <Text style={style.buttonText}>{slots.buttonText}</Text>
          </TouchableOpacity>
        )}
        {slots.secondButtonText && (
          <TouchableOpacity style={style.secondaryButton}>
            <Text style={style.secondaryButtonText}>
              {slots.secondButtonText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  </View>
);

const style = StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(9, 10, 10, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  popupContainer: {
    width: "80%",
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 24,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 5,
  },
  textContainer: {
    gap: 8,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
    color: "#090A0A",
  },
  description: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    color: "#72777A",
  },
  buttonContainer: {
    gap: 12,
    width: "100%",
  },
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
  secondaryButton: {
    width: "100%",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  secondaryButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#6B4EFF",
  },
});

export default Popup;
