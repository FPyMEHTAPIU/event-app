import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import Event from "@/components/Event";
import { useBookedEvents } from "@/components/context";

export default function EventsScreen() {
  const [loading, setLoading] = useState(false);
  const { bookedEvents, refreshBookedEvents } = useBookedEvents();

  useEffect(() => {
    refreshBookedEvents();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Button title="Get events" onPress={refreshBookedEvents} />

      {loading && <ActivityIndicator size="large" color="#007AFF" />}

      <View style={styles.eventsContainer}>
        {bookedEvents.length > 0
          ? bookedEvents.map((event, index) => (
              <Event key={event.id || index} event={event} />
            ))
          : !loading && <Text>No events available</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    gap: 8,
  },
  eventsContainer: {
    width: "100%",
    padding: 24,
    gap: 20,
  },
});
