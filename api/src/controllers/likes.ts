import jwt from "jsonwebtoken";
import { db } from "../connect.js";
export const getPostLikes = (req, res) => {
  const token = req.cookies.accessToken;
  const header = req.query.postId;
  jwt.verify(token, process.env.key, (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token");
    const q = `SELECT l.*, u.id as likedUserId, name, surname FROM postlikes as l 
                 JOIN users as u ON(l.likedPostId = ? AND l.likedUserId = u.id)`;
    db.query(q, header, (error, data) => {
      if (error) return res.status(500).json(error);
      if (data) return res.status(200).json(data);
    });
  });
};
export const postPostLikes = (req, res) => {};
