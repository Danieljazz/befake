import jwt from "jsonwebtoken";
import { db } from "../connect.js";
export const getNotifications = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("User not logged in");
  jwt.verify(token, process.env.key, (error, userId) => {
    if (error) return res.status(403).json(token);
    const q = `SELECT * FROM notifications WHERE notifier_id = ? ORDER BY createdAt DESC`;
    db.query(q, [userId.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(userId);
    });
  });
};
export const readNotification = () => {};
