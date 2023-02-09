import express from "express";
import { getUser, updateUser } from "../controllers/users.js";
const router = express.Router();
router.get("/find", getUser);
router.put("/update", updateUser);
export default router;
//# sourceMappingURL=users.js.map