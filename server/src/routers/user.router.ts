import express, { Request, Response } from "express";
import pool from "../config/database";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkIsEventBooked, getUserIdFromToken } from "../methods";
const userRouter = express.Router();
const secret = process.env.SECRET_KEY;

userRouter.get("/api/users/check-token", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(404).json({ error: "Token doesn't exist" });
    return;
  }
  if (!secret) {
    res
      .status(500)
      .json({ error: "Impossible to verify token on the server!" });
    return;
  }
  try {
    const verifiedToken = jwt.verify(token, secret);
    res.status(200).json({ token: verifiedToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token!" });
  }
});

userRouter.get("/api/user/", async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      res.status(401).json({ error: "Token not found" });
      return;
    }

    const userId = Number(getUserIdFromToken(auth));
    if (isNaN(userId)) {
      res.status(400).json({ error: "Invalid user ID from token" });
      return;
    }
    const result = await pool.query(
      "SELECT login, name, photo FROM users WHERE id = $1;",
      [userId],
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
  }
});

userRouter.post("/api/users/register", async (req: Request, res: Response) => {
  try {
    const userData: {
      login: string;
      password: string;
      name: string;
    } = req.body;
    if (!userData) {
      res.status(400).json({ error: "Login, password and name are required!" });
      return;
    }

    const schema = Joi.object({
      login: Joi.string().email().required(),
      password: Joi.string()
        .min(8)
        .pattern(/[A-Z]/, "uppercase")
        .pattern(/[0-9]/, "numbers")
        .pattern(/[`'"!~@#$%^&*()_+=-><|{}\[\]\\]/, "special characters")
        .required(),
      name: Joi.string().min(2).required(),
    });

    const { error } = schema.validate(userData);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const duplicate = await pool.query(
      "SELECT login FROM users WHERE login = $1;",
      [userData.login],
    );

    if (duplicate.rows.length !== 0) {
      res.status(409).json({
        error:
          "An account with this email already exists. Please log in or use a different email.",
      });
      return;
    }

    const encryptedPassword = await bcrypt.hash(userData.password, 10);

    const result = await pool.query(
      "INSERT INTO users (login, password, name) VALUES ($1, $2, $3) RETURNING login;",
      [userData.login, encryptedPassword, userData.name],
    );
    if (result.rows.length === 0) {
      res.status(500).json({ error: "User was not created" });
      return;
    }
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
  }
});

userRouter.post("/api/users/login", async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    const searchUserResult = await pool.query(
      "SELECT id, password FROM users WHERE login = $1;",
      [login],
    );
    if (searchUserResult.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const passwordCheck: boolean = await bcrypt.compare(
      password,
      searchUserResult.rows[0].password,
    );
    if (!passwordCheck) {
      res.status(400).json({ error: "Password doesn't match." });
      return;
    }
    if (!secret) {
      res
        .status(500)
        .json({ error: "Authorization failed on the server side." });
      return;
    }
    const token = jwt.sign({ id: searchUserResult.rows[0].id, login }, secret, {
      expiresIn: "1d",
    });
    res.status(200).json({ token: token });
  } catch (error) {
    console.error(error);
  }
});

userRouter.get("/api/user/events", async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      res.status(401).json({ error: "Token not found" });
      return;
    }

    const userId = Number(getUserIdFromToken(auth));
    if (isNaN(userId)) {
      res.status(400).json({ error: "Invalid user ID from token" });
      return;
    }

    const result = await pool.query(
      `SELECT e.*
         FROM booked_events be
                JOIN events e ON be.event_id = e.id
         WHERE be.user_id = $1;`,
      [userId],
    );

    if (result.rows.length === 0) {
      res.status(204).end();
      return;
    }

    res.status(200).json({ events: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.get(
  "/api/user/events/:eventId",
  async (req: Request, res: Response) => {
    try {
      const eventId = Number(req.params.eventId);
      if (isNaN(eventId)) {
        res.status(400).json({ error: "Invalid event ID" });
        return;
      }

      const auth = req.headers.authorization;
      if (!auth) {
        res.status(401).json({ error: "Token not found" });
        return;
      }

      const userId = Number(getUserIdFromToken(auth));
      if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID from token" });
        return;
      }

      const isBooked = await checkIsEventBooked(userId, eventId);
      res.status(200).json({ isBooked, userId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

userRouter.post("/api/user/events", async (req: Request, res: Response) => {
  try {
    const eventId = Number(req.body.eventId);
    const userId = Number(req.body.userId);

    if (isNaN(userId) || isNaN(eventId)) {
      res.status(400).json({ error: "Invalid eventId or userId" });
      return;
    }

    const isBooked = await checkIsEventBooked(userId, eventId);

    if (isBooked) {
      await pool.query(
        `DELETE FROM booked_events WHERE user_id = $1 AND event_id = $2;`,
        [userId, eventId],
      );
      res.status(200).json({ message: "The event has been cancelled." });
      return;
    } else {
      await pool.query(
        `INSERT INTO booked_events (user_id, event_id) VALUES ($1, $2);`,
        [userId, eventId],
      );
      res.status(200).json({ message: "You subscribed to this event." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default userRouter;
