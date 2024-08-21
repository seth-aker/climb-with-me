import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import usersRouter from "./routes/usersRouter";
import postRouter from "./routes/postRouter";
import friendsRouter from "./routes/friendsRouter";
import { registerMessageHandler } from "./handlers/messageHandler";

dotenv.config();
const PORT = process.env.PORT;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/api/v1/ping", (req, res) => {
  console.log(req);
  res.send("Pong");
});
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/friends", friendsRouter);

const onConnection = (socket: Socket) => {
  console.log("Connected");
  registerMessageHandler(io, socket);
};
io.on("connection", onConnection);
//Start
server.listen(PORT, () => {
  console.log(`Running on Port: ${PORT}`);
});
