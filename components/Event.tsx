import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { EventData } from "@/services/events";
import BookButton from "@/components/buttons/BookButton";

interface EventProps {
  event: EventData;
}

const Event: React.FC<EventProps> = ({ event }) => {
  return (
    <View style={style.eventContainer}>
      <View style={style.infoContainer}>
        <Image source={{ uri: event.photo }} style={style.imageContainer} />
        <View style={style.textContainer}>
          <Text style={style.title}>{event.title}</Text>
          <Text style={style.description}>{event.description}</Text>
        </View>
      </View>
      <View style={style.actionContainer}>
        <View style={style.dateContainer}>
          <Text style={style.dateTime}>{event.date}</Text>
          <Text style={style.dateTime}>{event.time}</Text>
        </View>
        <BookButton />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  eventContainer: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    height: 157,
    width: "100%",
    gap: 16,
    borderRadius: 8,
    alignSelf: "stretch",
    backgroundColor: "#F5F8FF",
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    width: 77,
    height: 77,
    borderRadius: 77,
  },
  textContainer: {
    height: 77,
    width: "100%",
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: 700,
    color: "black",
  },
  description: {
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: 400,
    color: "#262627",
    width: "100%",
    flexWrap: "wrap",
  },
  actionContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  dateContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  dateTime: {
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: 400,
    color: "#262627",
  },
});

export default Event;
