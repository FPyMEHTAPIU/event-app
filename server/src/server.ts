import express from "express";
const cors = require("cors");
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
