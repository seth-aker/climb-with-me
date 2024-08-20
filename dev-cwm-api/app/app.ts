import express from "express";
import usersRouter from "./routes/usersRouter";
import dotenv from "dotenv";
import postRouter from "./routes/postRouter";
import friendsRouter from "./routes/friendsRouter";
import expressWs from "express-ws";

dotenv.config();
const PORT = process.env.PORT;

const { app } = expressWs(express());
// Setup routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/friends", friendsRouter);
app.ws("/api/v1/messages", async (ws, req) => {});
//Start
app.listen(PORT, () => {
  console.log(`Running on Port: ${PORT}`);
});
