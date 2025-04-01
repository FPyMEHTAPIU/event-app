import { Button, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Text } from "react-native";

const BookButton = () => {
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = () => {
    //TODO: make API request to check isBooked?
    //  add to booked list
    //  remove from booked list

    setIsBooked(!isBooked);
  };
  return (
    <TouchableOpacity onPress={handleBooking} style={style.bookBtn}>
      <Text style={style.btnText}>{isBooked ? "Cancel" : "Book"}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  bookBtn: {
    width: 80,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 48,
    backgroundColor: "#6B4EFF",
  },
  btnText: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: 500,
    color: "white",
    textAlign: "center",
  },
});

export default BookButton;
