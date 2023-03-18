import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const userMessages = (req, res) => {
  const receiverId = req.params.receiverId;
  const accessToken = req.cookies.accessToken;
  jwt.verify(accessToken, process.env.key, (error, senderId) => {
    if (error) return res.status(403).json("Wrong credentials");
    const q = `SELECT c.*, u.id AS receiverId, name, surname, profilePhoto FROM chats AS c JOIN users AS u ON(u.id = c.receiverId) WHERE (c.senderId = 8 AND c.receiverId = 1) OR (c.senderId = 1 AND c.receiverId = 8) ORDER BY c.createdAt DESC`;
    db.query(q, [senderId.id, receiverId], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json(data);
    });
  });
};
export const createMessage = (req, res) => {
  const receiverId = req.params.receiverId;
  const accessToken = req.cookies.accessToken;
  jwt.verify(accessToken, process.env.key, (err, senderId) => {
    if (err) return res.status(403).json("wrong credentials");
    const q = "INSERT INTO chats (senderId, receiverId, message) VALUES (?)";
    const values = [senderId.id, receiverId, req.body.message];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json("Smth went wrong");
      return res.status(201).json("Message sent");
    });
  });
};

export const userRecentMessages = (req, res) => {
  const accessToken = req.cookies.accessToken;
  jwt.verify(accessToken, process.env.key, (err, sender) => {
    if (err) return res.status(403).json("wrong credentials");
    const q = `SELECT c.receiverId, c.message, c.createdAt FROM chats AS c INNER JOIN ( SELECT receiverId, max(createdAt) as MaxDate FROM chats GROUP BY receiverId ) AS tm on c.senderId = ? and c.createdAt = tm.MaxDate ORDER BY createdAt DESC`;
    db.query(q, [sender.id], (err, data) => {
      if (err) return res.status(500).json("Server error");
      return res.status(200).json(data);
    });
  });
};
