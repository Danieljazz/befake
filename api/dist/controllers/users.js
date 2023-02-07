import { db } from "../connect.js";
import jwt from "jsonwebtoken";
export const getUser = (req, res) => {
    const q = `SELECT * FROM users WHERE id = ?`;
    db.query(q, [req.query.userId], (err, data) => {
        if (err)
            return res.status(500).json(err);
        if (data.length > 0) {
            const { password, username, mail, ...others } = data[0];
            return res.status(200).json(others);
        }
        return res.status(500).json("User does not exists");
    });
};
export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    jwt.verify(token, process.env.key, (err, userInfo) => {
        if (err)
            res.status(403).json("Invalid token");
        const q = "UPDATE users SET `mail`=?, `name`=?, `surname`=?, `website`=?, `profilePhoto`=?, `country`=? WHERE id = ?"; // TODO: add password
        const values = [
            req.body.mail,
            req.body.name,
            req.body.username,
            req.body.webiste,
            req.body.profilePhoto,
            req.body.country,
        ];
        db.query(q, [
            req.body.mail,
            req.body.name,
            req.body.username,
            req.body.webiste,
            req.body.profilePhoto,
            req.body.country,
            userInfo.id,
        ], (err, data) => {
            if (err)
                res.status(500).json(err);
            return res.status(200).json("Profile updated!");
        });
    });
};
//# sourceMappingURL=users.js.map