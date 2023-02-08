import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const q = `SELECT * FROM users WHERE id = ?`;
  db.query(q, [req.query.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) {
      const { password, username, ...others } = data[0];
      return res.status(200).json(others);
    }
    return res.status(500).json("User does not exists");
  });
};

export const updateUser = (req, res) => {
  const accessToken = req.cookies.accessToken;
  jwt.verify(accessToken, process.env.key, (err, userInfo) => {
    if (err) res.status(403).json("Invalid token");
    const q =
      "UPDATE users SET `mail`=?, `name`=?, `surname`=?, `website`=?, `profilePhoto`=?, `country`=? WHERE id = ?"; // TODO: add password
    db.query(
      q,
      [
        req.body.mail,
        req.body.name,
        req.body.surname,
        req.body.webiste,
        req.body.profilePhoto,
        req.body.country,
        userInfo.id,
      ],
      (error, data) => {
        if (error) res.status(500).json(error);
        return res.status(200).json("Profile updated!");
      }
    );
  });
};
