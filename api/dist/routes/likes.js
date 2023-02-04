import express from "express";
import { getPostLikes, postPostLikes, deletePostLikes, } from "../controllers/likes.js";
const router = express.Router();
router.get("/", getPostLikes);
router.post("/", postPostLikes);
router.delete("/", deletePostLikes);
export default router;
//# sourceMappingURL=likes.js.map