import { Image, StyleSheet, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";

import { Text, View } from "@/components/Themed";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/store/authSlice";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
const ipPort =
  Constants.expoConfig?.extra?.LOCAL_IP_PORT || "http://localhost:3000";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const userToken = useSelector((state: RootState) => state.auth.token);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    photo:
      "https://st3.depositphotos.com/4071389/16855/i/450/depositphotos_168551948-stock-photo-happy-guy-in-grey-suit.jpg",
  });

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    dispatch(setToken(null));
  };

  const loadUser = async () => {
    try {
      if (!userToken) return;
      const result = await fetch(`${ipPort}/api/user/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (result.status === 200) {
        const data = await result.json();
        if (data && data[0]) {
          setUserData({
            name: data[0].name,
            email: data[0].login,
            photo:
              data[0].photo ||
              "https://st3.depositphotos.com/4071389/16855/i/450/depositphotos_168551948-stock-photo-happy-guy-in-grey-suit.jpg",
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userToken) loadUser();
  }, [userToken]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.userInfoContainer}>
        <Image
          source={{ uri: userData.photo }}
          alt="User image"
          style={styles.img}
        />
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{userData.name}</Text>
          <Text style={styles.emailText}>{userData.email}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    height: "100%",
  },
  userInfoContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 26,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 200,
  },
  textContainer: {
    alignItems: "center",
    gap: 8,
    alignSelf: "stretch",
  },
  nameText: {
    fontFamily: "Inter",
    fontSize: 32,
    fontWeight: 600,
    color: "black",
  },
  emailText: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: 400,
    color: "black",
  },
  logoutBtn: {
    padding: 16,
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#FF5247",
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: 500,
    color: "#FF5247",
  },
});
