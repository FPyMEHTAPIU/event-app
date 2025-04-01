import { Button, StyleSheet } from "react-native";
// import {fetch} from "expo/fetch";
import * as SecureStore from "expo-secure-store";

import { Text, View } from "@/components/Themed";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/authSlice";
import Constants from "expo-constants";
const ipPort =
  Constants.expoConfig?.extra?.LOCAL_IP_PORT || "http://localhost:3000";

export default function ProfileScreen() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    dispatch(setToken(null));
  };

  return (
    <View>
      <Button title="Logout" onPress={handleLogout} />
      {/*<Button title="get events" onPress={getEvents} />*/}
    </View>
  );
}

const styles = StyleSheet.create({});
