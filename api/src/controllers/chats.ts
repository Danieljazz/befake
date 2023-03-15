import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const userMessages = (req, res) => {
  const reciverId = req.params.reciverId;
  const accessToken = req.cookies.accessToken;
  jwt.verify(accessToken, process.env.key, (error, senderId) => {
    if (error) return res.status(403).json("Wrong credentials");
    const q = `SELECT * from chats WHERE senderId = ? AND reciverId = ? LEFT JOIN users ON(user.id = reciverId) DESC BY`;
    //   `SELECT c.*, u.id AS userId, name, surname, profilePhoto FROM chats AS c JOIN users as u ON(user.id = reciverId) `
    db.query(q, [senderId, reciverId], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json(data);
    });
  });
};
export const createMessage = (req, res) => {};
