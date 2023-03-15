import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const userMessages = (req, res) => {
  const reciverId = req.params.reciverId;
  const accessToken = req.cookies.accessToken;
  jwt.verify(accessToken, process.env.key, (error, senderId) => {
    if (error) return res.status(403).json("Wrong credentials");
    const q = `SELECT c.*, u.id AS reciverId, name, surname, 
                profilePhoto FROM chats AS c JOIN users AS u 
                ON(u.id = c.reciverId) WHERE 
                senderId = ? AND reciverId = ?
                ORDER BY createdAt DESC`;
    //   `SELECT c.*, u.id AS userId, name, surname, profilePhoto FROM chats AS c JOIN users as u ON(user.id = reciverId) `
    db.query(q, [senderId.id, reciverId, reciverId], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json(data);
    });
  });
};
export const createMessage = (req, res) => {};
