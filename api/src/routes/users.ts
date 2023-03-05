import express from "express";
import { getUser, updateUser, searchUser } from "../controllers/users.js";
const router = express.Router();

router.get("/find", getUser);
router.put("/update", updateUser);
router.get("/search_user", searchUser);
export default router;
