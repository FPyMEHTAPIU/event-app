import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./controllers/user.controller";

dotenv.config();
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

app.use(userRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
