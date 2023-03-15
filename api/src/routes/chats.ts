import express from "express";
import { userMessages, createMessage } from "../controllers/chats.js";
const router = express.Router();

router.get("/:id", userMessages);
router.post("/:id", createMessage);

export default router;
