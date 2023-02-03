import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";
export const getPosts = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token)
        return res.status(401).json("User not logged in");
    jwt.verify(token, process.env.key, (err, userInfo) => {
        if (err)
            return res.status(404).json(err);
        const q = `SELECT p.*, u.id AS userId, name, surname, profilePhoto 
            FROM posts AS p JOIN users AS u ON (u.id = p.userId) 
            LEFT JOIN relationships AS r ON(p.userId = r.followedUserId)
            WHERE r.followingUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`;
        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if (err)
                return res.status(404).json(err);
            return res.status(200).json(data);
        });
    });
};
export const createPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token)
        return res.status(401).json("User not logged in");
    jwt.verify(token, process.env.key, (err, userInfo) => {
        if (err)
            return res.status(403).json("Token is not valid");
        const q = "INSERT INTO posts (userId, postContent, postPhoto, createdAt) VALUE (?) ";
        const values = [
            userInfo.id,
            req.body.postContent,
            req.body.postPhoto,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ];
        db.query(q, [values], (err, data) => {
            if (err)
                return res.status(500).json(err);
            if (data)
                return res.status(200).json("Post created properly");
        });
    });
};
//# sourceMappingURL=posts.js.map