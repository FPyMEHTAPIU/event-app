import { Button, StyleSheet } from "react-native";
import { useState } from "react";

const BookButton = () => {
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = () => {
    //TODO: make API request to check isBooked?
    //  add to booked list
    //  remove from booked list

    setIsBooked(!isBooked);
  };
  return (
    <Button title={isBooked ? "Cancel" : "Book"} onPress={handleBooking} />
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

export default BookButton;
