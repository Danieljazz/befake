import express from "express";
import {
  getUserRelathionship,
  createRelathionship,
  deleteRelathionship,
  friendRequest,
} from "../controllers/relationship.js";
const router = express.Router();

router.get("/", getUserRelathionship);
router.post("/", createRelathionship);
router.delete("/", deleteRelathionship);
router.get("/friendRequest", friendRequest);

export default router;
