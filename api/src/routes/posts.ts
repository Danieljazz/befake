import express from "express";
import {
  createPost,
  getPosts,
  deletePost,
  editPost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.delete("/", deletePost);
router.put("/", editPost);
export default router;
