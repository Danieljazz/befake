import moment from "moment";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";
export const getComments = (req, res) => {
    const q = `SELECT c.*, u.id AS commentUserId, name, surname, 
              profilePhoto FROM comments AS c JOIN users AS u
              ON(c.commentPostId = ? AND c.commentUserId = u.id) ORDER BY c.createdAt DESC`;
    const postId = req.query.postId;
    db.query(q, [postId], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(data);
    });
};
export const createComment = (req, res) => {
    const token = req.cookies.accessToken;
    jwt.verify(token, process.env.key, (err, userInfo) => {
        if (err)
            return res.status(403).json("Token not valid");
        const q = "INSERT INTO comments (commentPostId, commentUserId, commentContent, createdAt) VALUES (?)";
        const value = [
            req.body.commentPostId,
            userInfo.id,
            req.body.commentContent,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ];
        db.query(q, [value], (err, data) => {
            if (err)
                return res.status(500).json(err);
            if (data)
                return res.status(200).json("comment created");
        });
    });
};
//# sourceMappingURL=comments.js.map