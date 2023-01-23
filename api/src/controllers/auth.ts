import { db } from "../connect.js";
import cryptoJS from "crypto-js";

export const register = (req, res) => {
  const q: string = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already  exists");
    const hashedPassword: string = cryptoJS.AES.encrypt(
      req.body.password,
      process.env.n5jYy70iY
    );
    const iq: string =
      "INSERT INTO users (`username`, `mail`, `name`, `surname`, `password`) VALUE (?)";

    const values: string[] = [
      req.body.username,
      req.body.mail,
      req.body.name,
      req.body.surname,
      hashedPassword,
    ];
    db.query(iq, [values], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data) {
        return res.status(200).json("User registered properly");
      }
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(403).json("Wrong credentials");
    if (data.length === 0) return res.status(404).json("User not found");
    const hashedPassword = cryptoJS.AES.decrypt(
      data[0].password,
      process.env.n5jYy70iY
    );
    const orgPass = hashedPassword.toString(cryptoJS.enc.Utf8);
    if (orgPass === req.body.password) {
      return res.status(200).json("Access granted");
    } else {
      return res.status(403).json("Wrong credentials");
    }
  });
};

export const logout = (req, res) => {};
