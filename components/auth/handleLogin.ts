import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
// import {fetch} from "expo/fetch";
const ipPort =
  Constants.expoConfig?.extra?.LOCAL_IP_PORT || "http://localhost:3000";
import { LoginDataProps } from "@/components/buttons/AuthButton";
import { setToken } from "@/store/authSlice";
import { Dispatch } from "redux";

const handleLogin = async (
  data: LoginDataProps,
  setErrorMessage: (msg: string) => void,
  dispatch: Dispatch,
) => {
  try {
    const loginResponse = await fetch(`${ipPort}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: data.login,
        password: data.password,
      }),
    });
    const responseData = await loginResponse.json();
    console.log(loginResponse);
    console.log(responseData);
    if (loginResponse.ok && responseData && responseData.token) {
      await SecureStore.setItemAsync("userToken", responseData.token);
      dispatch(setToken(responseData.token));
      console.log("success");
    } else {
      setErrorMessage(responseData?.error || "Unknown error");
    }
  } catch (error) {
    setErrorMessage("Authorization error occur");
    console.error(error);
  }
};

export default handleLogin;
