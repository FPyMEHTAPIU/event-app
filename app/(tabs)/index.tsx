import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import Event from "@/components/Event";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
const ipPort =
  Constants.expoConfig?.extra?.LOCAL_IP_PORT || "http://localhost:3000";

export default function HomeScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getEvents = async () => {
    setLoading(true);
    try {
      const result = await fetch(`${ipPort}/api/events`);
      const data = await result.json();
      if (result.status === 200 && data?.events) {
        setEvents(data.events);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#007AFF" />}

      <View style={styles.eventsContainer}>
        {events.length > 0
          ? events.map((event, index) => (
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
