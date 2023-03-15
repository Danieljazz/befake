import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const userMessages = (req, res) => {
  const reciverId = req.params.reciverId;
  const accessToken = req.cookies.accessToken;
  jwt.verify(accessToken, process.env.key, (error, senderId) => {
    if (error) return res.status(403).json("Wrong credentials");
    const q = `SELECT c.*, u.id AS receiverId, name, surname, profilePhoto FROM chats AS c JOIN users AS u ON(u.id = c.receiverId) WHERE c.senderId = ? AND c.receiverId = ? ORDER BY c.createdAt DESC`;
    //     //   `SELECT c.*, u.id AS reciverId, name, surname,
    // profilePhoto FROM chats AS c JOIN users AS u
    // ON(u.id = c.reciverId) WHERE
    // c.senderId = ? AND c.reciverId = ?
    // ORDER BY c.createdAt DESC`;
    db.query(q, [senderId.id, reciverId], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json(data);
    });
  });
};
export const createMessage = (req, res) => {};
