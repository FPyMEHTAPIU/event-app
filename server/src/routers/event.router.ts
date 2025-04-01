import express, { Request, Response } from "express";
import pool from "../config/database";
import Joi from "joi";
const eventRouter = express.Router();

eventRouter.get("/api/events/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM events;");
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Events list is empty =(" });
      return;
    }
    res.status(200).json({ events: result.rows });
  } catch (error) {
    console.error(error);
  }
});

eventRouter.get("/api/events/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM events WHERE id = $1;", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Event not found" });
      return;
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
  }
});

eventRouter.post("/api/events/create", async (req: Request, res: Response) => {
  try {
    const eventData: {
      title: string;
      description: string;
      date: string;
      time: string;
      photo: string;
      capacity: number;
    } = req.body;
    if (!eventData) {
      res.status(400).json({ error: "Please fill all event's fields" });
      return;
    }

    const schema = Joi.object({
      title: Joi.string().min(4).required(),
      description: Joi.string().min(30).required(),
      date: Joi.string().isoDate().required(),
      time: Joi.string()
        .pattern(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/, "time")
        .required(),
      photo: Joi.string().required(),
      capacity: Joi.number().required(),
    });

    const { error } = schema.validate(eventData);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const result = await pool.query(
      `INSERT INTO events (title, description, date, time, photo, capacity)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING title;`,
      [
        eventData.title,
        eventData.description,
        eventData.date,
        eventData.time,
        eventData.photo,
        eventData.capacity,
      ],
    );
    if (result.rows.length === 0) {
      res.status(500).json({ error: "Event was not created" });
      return;
    }
    res.status(201).json({ message: "Event created successfully!" });
  } catch (error) {
    console.error(error);
  }
});

export default eventRouter;
