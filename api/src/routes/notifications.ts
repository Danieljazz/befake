import express from "express";
import {
  getNotifications,
  readNotification,
} from "../controllers/notifications.js";

const router = express.Router();
router.get("/", getNotifications);
router.post("/", readNotification);
export default router;
