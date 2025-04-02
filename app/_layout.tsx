import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router"; // Добавляем useRouter
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import * as SecureStore from "expo-secure-store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, RootState } from "@/store/store";
import { loadToken } from "@/store/authSlice";
import { useColorScheme } from "@/components/useColorScheme";
import { BookedEventsProvider } from "@/components/context";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "login",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AuthLoader />
      <RootLayoutNav />
    </Provider>
  );
}

function AuthLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        dispatch(loadToken(token));
      } catch (error) {
        console.error("Token loading error", error);
      }
    };
    checkAuth();
  }, [dispatch]);

  return null;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("(tabs)");
    } else {
      router.replace("login");
    }
  }, [isAuthenticated, router]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <BookedEventsProvider>
        <Stack>
          <Stack.Screen
            name={isAuthenticated ? "(tabs)" : "login"}
            options={{ headerShown: false }}
          />
        </Stack>
      </BookedEventsProvider>
    </ThemeProvider>
  );
}
