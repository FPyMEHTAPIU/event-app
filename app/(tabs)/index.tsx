import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import Event from "@/components/Event";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Event />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
