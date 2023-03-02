import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getStories = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, process.env.key, (err, userInfo) => {
    if (err) return res.status(403).json(err);
    const q = `SELECT s.*, u.id AS userId, name, surname FROM stories AS s JOIN users AS u ON(s.storyUserId = u.id) LEFT JOIN relationships AS r ON(s.storyUserId = r.followedUserId) WHERE r.followingUserId = ? OR s.storyUserId = ? ORDER BY createdAt DESC`;
    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length > 0) {
        return res.status(200).json(data);
      }
    });
  });
};

export const createStory = (req, res) => {};

export const deleteStory = (req, res) => {};
