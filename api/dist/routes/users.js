import express from "express";
const router = express.Router();
router.get("/test", (req, res) => {
    res.send("HI AJ");
});
export default router;
//# sourceMappingURL=users.js.map