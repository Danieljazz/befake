import express from "express";
import { userMessages, createMessage } from "../controllers/chats.js";
const router = express.Router();

router.get("/:reciverId", userMessages);
router.post("/:reciverId", createMessage);

export default router;
