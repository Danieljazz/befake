import express from "express";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import commentsRoutes from "./routes/comments.js";
import likesRoutes from "./routes/likes.js";
import relationshipsRoutes from "./routes/relationships.js";
import storiesRoutes from "./routes/stories.js";
import chatsRoutes from "./routes/chats.js";
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
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://befake.danielsprojects.com.pl",
    ],
  })
);
app.use(cookieParser());
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postsRoutes);
app.use("/api/v1/comments", commentsRoutes);
app.use("/api/v1/postlikes", likesRoutes);
app.use("/api/v1/relationships", relationshipsRoutes);
app.use("/api/v1/stories", storiesRoutes);
app.use("/api/v1/chats", chatsRoutes);
app.listen("8080" || process.env.PORT, () => {
  console.log(`Backend runs on port ${process.env.PORT}`);
});
