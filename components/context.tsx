import { createContext, useContext, useState, useCallback } from "react";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ipPort =
  Constants.expoConfig?.extra?.LOCAL_IP_PORT || "http://localhost:3000";

type BookedEventsContextType = {
  bookedEvents: any[];
  refreshBookedEvents: () => Promise<void>;
};

const BookedEventsContext = createContext<BookedEventsContextType | undefined>(
  undefined,
);

export const BookedEventsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookedEvents, setBookedEvents] = useState<any[]>([]);
  const userToken = useSelector((state: RootState) => state.auth.token);

  const refreshBookedEvents = useCallback(async () => {
    if (!userToken) {
      setBookedEvents([]);
      return;
    }
    try {
      const result = await fetch(`${ipPort}/api/user/events`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (result.status === 200) {
        const data = await result.json();
        setBookedEvents(data.events || []);
      } else if (result.status === 204) {
        setBookedEvents([]);
      } else {
        console.error("Unexpected status:", result.status);
        setBookedEvents([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setBookedEvents([]);
    }
  }, [userToken]);

  return (
    <BookedEventsContext.Provider value={{ bookedEvents, refreshBookedEvents }}>
      {children}
    </BookedEventsContext.Provider>
  );
};

export const useBookedEvents = () => {
  const context = useContext(BookedEventsContext);
  if (!context) {
    throw new Error(
      "useBookedEvents must be used within a BookedEventsProvider",
    );
  }
  return context;
};
