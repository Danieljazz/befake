import express from "express";
import {
  userMessages,
  createMessage,
  userRecentMessages,
} from "../controllers/chats.js";
const router = express.Router();

router.get("/:receiverId", userMessages);
router.post("/:receiverId", createMessage);
router.get("/", userRecentMessages);

export default router;
