import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/user.router";
import eventRouter from "./routers/event.router";

dotenv.config();
const app = express();
const port = 3000;

app.use(
  cors({
    origin: process.env.LOCAL_IP_PORT || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);
app.use(express.json());
app.use(userRouter);
app.use(eventRouter);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server started on port ${port}`);
});
