import express from "express";
import {
  getRelathionship,
  createRelathionship,
} from "../controllers/relathionship.js";
const router = express.Router();

router.get("/", getRelathionship);
router.post("/", createRelathionship);

export default router;
