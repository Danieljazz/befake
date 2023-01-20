import express from "express";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
const app = express();
app.use(express.json());
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/auth", authRoutes);
app.listen("8080", () => {
  console.log("backend run on port 8080");
});
