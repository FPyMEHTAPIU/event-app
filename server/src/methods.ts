import pool from "./config/database";
import jwt from "jsonwebtoken";
const secret = process.env.SECRET_KEY;

export const checkIsEventBooked = async (
  userId: number,
  eventId: number,
): Promise<boolean> => {
  try {
    const result = await pool.query(
      `SELECT * FROM booked_events WHERE user_id = $1 AND event_id = $2`,
      [userId, eventId],
    );
    return result.rows.length > 0;
  } catch (error) {
    console.error("Error checking event booking:", error);
    return false;
  }
};

export const getUserIdFromToken = (auth: string): string | null => {
  const userToken = auth?.split(" ")[1];
  if (!userToken || !secret) return null;
  try {
    const decoded = jwt.verify(userToken, secret);
    if (typeof decoded === "string") return null;
    return decoded.id.toString();
  } catch (error) {
    return null;
  }
};
