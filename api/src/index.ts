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
import { createServer } from "https";
import { Server } from "socket.io";

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

let activeUsers = [];

//SOCKET FUNCTIONS:
const addUser = (profileId, socketId) => {
  !activeUsers.some((user) => user.profileId === profileId) &&
    activeUsers.push({ profileId, socketId });
};

const myOnlineFriends = (friends: Array<number>) => {
  let activeFriends = activeUsers.filter((user) =>
    friends.includes(user.profileId)
  );
  let activeFriendsArray = activeFriends.map((user) => user.profileId);
  return activeFriendsArray;
};

io.on("connection", (socket) => {
  console.log("new user active");
  socket.on("addActiveUser", (profileId) => {
    addUser(profileId, socket.id);
    //io.emit("getUsers", activeUsers);
  });

  socket.on("areMyFriendsOnline", (friends: Array<number>) => {
    let activeFriends = myOnlineFriends(friends);
    io.emit("areMyFriendsOnlineResponse", activeFriends);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
  });
});

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
    origin: "*",
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

app.set("port", "8080" || process.env.PORT);

httpServer.listen(app.get("port"), function () {
  console.log("Server running ");
});
// app.listen("8080" || process.env.PORT, () => {
//   console.log(`Backend runs on port ${process.env.PORT}`);
// });
