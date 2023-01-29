import { express } from "express";
import { getComments, createComment } from "../controllers/comments.js";
const router = express.Router();
router.get("/comments", getComments);
router.post("/comments", createComment);
export default router;
//# sourceMappingURL=comments.js.map