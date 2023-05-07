import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUserRelathionship = (req, res) => {
  const userId = req.query.userId;
  const q = `SELECT u.id, name, surname, profilePhoto FROM relationships AS r LEFT JOIN users AS u ON(r.followedUserId = u.id) WHERE followingUserId = ?`;
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const createRelathionship = (req, res) => {
  const accessToken = req.cookies.accessToken;
  jwt.verify(accessToken, process.env.key, (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token");
    const q = `INSERT IGNORE INTO relationships (followingUserId, followedUserId) VALUES (?)`;
    const values = [userInfo.id, req.body.followedUserId];
    db.query(q, [values], (error, data) => {
      if (error) res.status(500).json(error);
      return res.status(200).json("Relathionship created.");
    });
  });
};
export const deleteRelathionship = (req, res) => {
  const accessToken = req.cookies.accessToken;
  jwt.verify(accessToken, process.env.key, (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token");
    const q = `DELETE FROM relationships WHERE followingUserId =? AND followedUserId = ?`;
    db.query(q, [userInfo.id, req.query.followedUserId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Relathionship deleted");
    });
  });
};

export const friendRequest = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, process.env.key, (err, userInfo) => {
    if (err) return res.status(401).json("wrong credentials");
    const q =
      "SELECT r.*, name, surname, profilePhoto, u.id FROM relationships AS r LEFT JOIN users AS u ON( u.id = r.followingUserId ) WHERE NOT EXISTS (SELECT nr.* FROM relationships AS nr WHERE (r.followingUserId = ? AND nr.followedUserId = r.followingUserId) )";
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
