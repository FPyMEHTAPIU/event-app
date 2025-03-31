export interface EventData {
  title: string;
  description: string;
  photo_url: string;
  date: string;
  time: string;
  isBooked: boolean;
}

const events: EventData[] = [
  {
    title: "Event 1",
    description: "Description of the event 1",
    photo_url: require("../assets/images/favicon.png"),
    date: "5 Apr",
    time: "14:30",
    isBooked: false,
  },
  {
    title: "Event 2",
    description: "Description of the event 2",
    photo_url: require("../assets/images/favicon.png"),
    date: "8 Apr",
    time: "12:30",
    isBooked: false,
  },
  {
    title: "Event 3",
    description: "Description of the event 3",
    photo_url: require("../assets/images/favicon.png"),
    date: "15 Apr",
    time: "18:00",
    isBooked: false,
  },
];

export default events;
