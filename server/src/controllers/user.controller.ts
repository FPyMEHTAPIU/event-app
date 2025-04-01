import express, { Request, Response } from "express";
import pool from "../config/database";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

userRouter.get("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT login, name, photo FROM users WHERE id = $1;",
      [req.params.id],
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
    res.status(201).json({ error: "User created successfully!" });
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
    res.status(200).json(token);
  } catch (error) {
    console.error(error);
  }
});

export default userRouter;
