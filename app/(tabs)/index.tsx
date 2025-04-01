import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import Event from "@/components/Event";
import events from "@/services/events";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {events.map((event, index) => {
        return <Event key={index} event={event} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    gap: 8,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
