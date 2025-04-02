import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { Text } from "react-native";
import { EventProps } from "@/components/Event";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Constants from "expo-constants";
import { useFocusEffect } from "@react-navigation/native";
import { useBookedEvents } from "@/components/context";

const ipPort =
  Constants.expoConfig?.extra?.LOCAL_IP_PORT || "http://localhost:3000";

const BookButton: React.FC<EventProps> = ({ event }) => {
  const [isBooked, setIsBooked] = useState(false);
  const userToken = useSelector((state: RootState) => state.auth.token);
  const [userId, setUserId] = useState<number>(0);
  const eventId = event.id as number;
  const { refreshBookedEvents } = useBookedEvents();

  const checkBooking = async () => {
    try {
      if (!userToken) return;
      const res = await fetch(`${ipPort}/api/user/events/${eventId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await res.json();
      setIsBooked(!(!data || !data.isBooked));
      setUserId(data.userId);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkBooking();
    }, [eventId, userToken]),
  );

  const handleBooking = async () => {
    try {
      const res = await fetch(`${ipPort}/api/user/events/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          eventId: eventId,
        }),
      });
      const data = await res.json();
      checkBooking();
      refreshBookedEvents();
      if (!res.ok) {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TouchableOpacity
      onPress={handleBooking}
      style={isBooked ? style.cancelBtn : style.bookBtn}
    >
      {isBooked ? (
        <Text style={style.cancelBtnText}>Cancel</Text>
      ) : (
        <Text style={style.btnText}>Book</Text>
      )}
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
  cancelBtn: {
    width: 80,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 48,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#FF5247",
  },
  btnText: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: 500,
    color: "white",
    textAlign: "center",
  },
  cancelBtnText: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: 500,
    color: "#FF5247",
    textAlign: "center",
  },
});

export default BookButton;
