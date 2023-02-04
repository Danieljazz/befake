import express from "express";
import { getUser } from "../controllers/users.js";
const router = express.Router();
router.get("/find", getUser);
export default router;
//# sourceMappingURL=users.js.map