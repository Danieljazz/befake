import express from "express";
import { userMessages, createMessage } from "../controllers/chats.js";
const router = express.Router();

router.get("/:receiverId", userMessages);
router.post("/:receiverId", createMessage);

export default router;
