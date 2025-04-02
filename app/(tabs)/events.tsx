import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import Event from "@/components/Event";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
const ipPort =
  Constants.expoConfig?.extra?.LOCAL_IP_PORT || "http://localhost:3000";

export default function EventsScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const userToken = useSelector((state: RootState) => state.auth.token);

  const getBookedEvents = async () => {
    setLoading(true);
    try {
      if (!userToken) return;
      const result = await fetch(`${ipPort}/api/user/events`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
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
    getBookedEvents();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Button title="Get events" onPress={getBookedEvents} />

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
