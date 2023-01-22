import { db } from "../connect.js";
export const login = (req, res) => {
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};
export const register = (req, res) => { };
export const logout = (req, res) => { };
//# sourceMappingURL=auth.js.map