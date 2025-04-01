import Constants from "expo-constants";
// import {fetch} from "expo/fetch";
const ipPort =
  Constants.expoConfig?.extra?.LOCAL_IP_PORT || "http://localhost:3000";
import { RegisterDataProps } from "@/components/buttons/AuthButton";

const handleRegister = async (
  data: RegisterDataProps,
  setErrorMessage: (msg: string) => void,
  setIsLoginScreen: (isLoginScreen: boolean) => void,
  setPopup: (popup: boolean) => void,
) => {
  try {
    if (data.password !== data.passwordConfirmation) {
      setErrorMessage("Passwords don't match");
      return;
    }
    const registerResponse = await fetch(`${ipPort}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: data.login,
        password: data.password,
        name: data.name,
      }),
    });
    if (registerResponse.status === 201) {
      console.log("success");
      setPopup(true);
      setTimeout(() => {
        setIsLoginScreen(true);
        setPopup(false);
      }, 5000);
    } else {
      setErrorMessage(await registerResponse.json());
    }
  } catch (error) {
    setErrorMessage("Registration error occur");
    console.error(error);
  }
};

export default handleRegister;
