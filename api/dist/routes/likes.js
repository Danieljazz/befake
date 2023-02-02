import express from "express";
import { getPostLikes, postPostLikes, deletePostLikes, } from "../controllers/likes.js";
const router = express.Router();
router.get("/posts", getPostLikes);
router.post("/posts", postPostLikes);
router.delete("/posts", deletePostLikes);
export default router;
//# sourceMappingURL=likes.js.map