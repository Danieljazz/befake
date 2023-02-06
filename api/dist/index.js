import express from "express";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import commentsRoutes from "./routes/comments.js";
import likesRoutes from "./routes/likes.js";
import relationshipsRoutes from "./routes/relationships.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.header({
        "Access-Control-Allow-Credentials": true,
    });
    next();
});
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(cookieParser());
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postsRoutes);
app.use("/api/v1/comments", commentsRoutes);
app.use("/api/v1/postlikes", likesRoutes);
app.use("/api/v1/relationships", relationshipsRoutes);
app.listen("8080", () => {
    console.log("backend run on port 8080");
});
//# sourceMappingURL=index.js.map