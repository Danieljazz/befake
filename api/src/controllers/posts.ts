import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";
export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  const userId = req.query.userId;
  if (!token) return res.status(401).json("User not logged in");

  jwt.verify(token, process.env.key, (err, userInfo) => {
    if (err) return res.status(404).json(err);
    const q =
      userId !== undefined
        ? `SELECT p.*, u.id AS userId, name, surname, profilePhoto 
            FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.id AS userId, name, surname, profilePhoto 
            FROM posts AS p JOIN users AS u ON (u.id = p.userId) 
            LEFT JOIN relationships AS r ON(p.userId = r.followedUserId)
            WHERE r.followingUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`;
    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];
    db.query(q, values, (err, data) => {
      if (err) return res.status(404).json(err);
      return res.status(200).json(data);
    });
  });
};

export const createPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("User not logged in");
  jwt.verify(token, process.env.key, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "INSERT INTO posts (userId, postContent, postPhoto, createdAt) VALUE (?) ";
    const values: string[] = [
      userInfo.id,
      req.body.postContent,
      req.body.postPhoto,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data) return res.status(200).json("Post created properly");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, process.env.key, (err, data) => {
    if (err) return res.status(403).json("Invalid token");
    const q = "DELETE FROM posts WHERE id=?";
    db.query(q, req.query.postId, (error, data) => {
      if (error) return res.status(500).json("Smth went wrong");
      return res.status(200).json("post deleted");
    });
  });
};
