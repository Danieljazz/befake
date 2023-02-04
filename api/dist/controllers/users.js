import { db } from "../connect.js";
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
//# sourceMappingURL=users.js.map