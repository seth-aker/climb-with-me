import express from "express";
import usersRouter from "./routes/usersRouter";
import dotenv from "dotenv";
import postRouter from "./routes/postRouter";
dotenv.config();
const PORT = process.env.PORT;

const app = express();

// Setup routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/posts", postRouter);
//Start
app.listen(PORT, () => {
  console.log(`Running on Port: ${PORT}`);
});
