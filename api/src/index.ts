import express from "express";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
  });
  next();
});
app.use(cors({ origin: ["http://127.0.0.1:5173"] }));
app.use(cookieParser());
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/auth", authRoutes);
app.listen("8080", () => {
  console.log("backend run on port 8080");
});
