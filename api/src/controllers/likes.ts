import jwt from "jsonwebtoken";
import { db } from "../connect.js";
export const getPostLikes = (req, res) => {
  const postId = req.query.postId;
  const q = `SELECT l.*, u.id as likedUserId, name, surname FROM postlikes as l 
                 JOIN users as u ON(l.likedPostId = ? AND l.likedUserId = u.id)`;
  db.query(q, [postId], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json(data);
  });
};
export const postPostLikes = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, process.env.key, (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token");
    const q = `INSERT IGNORE INTO postlikes (likedPostId, likedUserId) VALUES (?)`;
    const values = [req.body.postId, userInfo.id];
    db.query(q, [values], (error, data) => {
      if (error) return res.status(500).json(err);
      return res.status(200).json("Liked post");
    });
  });
};
export const deletePostLikes = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, process.env.key, (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token");
    const q = `DELETE FROM postlikes WHERE likedPostId = ? AND likedUserId = ?`;
    db.query(q, [req.query.postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Like deleted");
    });
  });
};
