import express from "express";
import { userMessages, createMessage } from "../controllers/chats.js";
const router = express.Router();

router.get("/chat/:id", userMessages);
router.post("/chat/:id", createMessage);

export default router;
