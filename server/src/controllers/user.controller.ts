import express from "express";
import pool from "../config/database";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();
const secret = process.env.SECRET_KEY;

router.get(
  "/users/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE id = $1;", [
        req.params.id,
      ]);
      if (result.rows.length === 0) {
        res.status(404).send("User not found");
        return;
      }
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
    }
  },
);

router.post(
  "/users/register",
  async (req: express.Request, res: express.Response) => {
    try {
      const userData: {
        login: string;
        password: string;
        name: string;
      } = req.body;

      const schema = Joi.object({
        email: Joi.string().email().required(),
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
        res.status(400).send(error);
        return;
      }

      const duplicate = await pool.query(
        "SELECT * FROM users WHERE login = $1;",
        [userData.login],
      );

      if (duplicate.rows.length !== 0) {
        res
          .status(409)
          .send(
            "An account with this email already exists. Please log in or use a different email.",
          );
        return;
      }

      const encryptedPassword = await bcrypt.hash(userData.password, 10);

      const result = await pool.query(
        "INSERT INTO users (login, password, name) VALUES ($1, $2, $3) RETURNING *;",
        [userData.login, encryptedPassword, userData.name],
      );
      if (result.rows.length === 0) {
        res.status(500).send("User was not created");
        return;
      }
      res.status(201).send("User created successfully!");
    } catch (error) {
      console.error(error);
    }
  },
);

router.post(
  "/users/login",
  async (req: express.Request, res: express.Response) => {
    try {
      const { login, password } = req.body;

      const searchUserResult = await pool.query(
        "SELECT * FROM users WHERE login = $1;",
        [login],
      );
      if (searchUserResult.rows.length === 0) {
        res.status(404).send("User not found");
        return;
      }

      const passwordCheck: boolean = await bcrypt.compare(
        password,
        searchUserResult.rows[0].password,
      );
      if (!passwordCheck) {
        res.status(400).send("Password doesn't match.");
        return;
      }
      if (!secret) {
        res.status(500).send("Authorization failed on the server side.");
        return;
      }
      const token = jwt.sign(
        { id: searchUserResult.rows[0].id, login },
        secret,
        { expiresIn: "1d" },
      );
      res.status(200).json(token);
    } catch (error) {
      console.error(error);
    }
  },
);
