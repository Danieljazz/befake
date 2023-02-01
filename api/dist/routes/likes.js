import express from "express";
import { getPostLikes, postPostLikes } from "../controllers/likes.js";
const router = express.Router();
router.get("/posts", getPostLikes);
router.post("/posts", postPostLikes);
export default router;
//# sourceMappingURL=likes.js.map