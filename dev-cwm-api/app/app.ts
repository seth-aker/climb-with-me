import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import usersRouter from "./routes/usersRouter";
import postRouter from "./routes/postRouter";
import friendsRouter from "./routes/friendsRouter";
import { registerMessageHandler } from "./handlers/messageHandler";
import messageRouter from "./routes/messageRouter";

dotenv.config();
const PORT = process.env.PORT;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/friends", friendsRouter);
app.use("/api/v1/chats", messageRouter);

const onConnection = (socket: Socket) => {
  console.log("Connected " + new Date(Date.now()));
  registerMessageHandler(io, socket);
};
io.on("connection", (socket: Socket) => {
  onConnection(socket);
});
io.on("disconnected", (socket: Socket) => {
  console.log("disconnected");
});
//Start
server.listen(PORT, () => {
  console.log(`Running on Port: ${PORT}`);
});
