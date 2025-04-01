import { Pool } from "pg";
require("dotenv").config();

const pool = new Pool({
  user: process.env.POSTGRES_NAME,
  password: process.env.POSTGRES_PASSWORD,
  host: "localhost",
  database: "event-app-db",
  port: 5432,
});

export default pool;
