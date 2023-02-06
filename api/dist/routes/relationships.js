import express from "express";
import { getUserRelathionship, createRelathionship, deleteRelathionship, } from "../controllers/relationship.js";
const router = express.Router();
router.get("/", getUserRelathionship);
router.post("/", createRelathionship);
router.delete("/", deleteRelathionship);
export default router;
//# sourceMappingURL=relationships.js.map