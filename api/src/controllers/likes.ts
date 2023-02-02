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
export const postPostLikes = (req, res) => {};
export const deletePostLikes = (req, res) => {};
