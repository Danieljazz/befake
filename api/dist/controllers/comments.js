import { db } from "../connect.js";
export const getComments = (req, res) => {
    const q = `SELECT c.*, u.id AS commentUserId, name, surname, profilePhoto FROM comments AS c JOIN users AS u ON(c.commentPostId = ? AND c.commentUserId = u.id)`;
    const postId = req.query.postId;
    db.query(q, [postId], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(data);
    });
};
export const createComment = () => { };
//# sourceMappingURL=comments.js.map