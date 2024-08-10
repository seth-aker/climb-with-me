import express from "express"
import usersRouter from './routes/user'
import dotenv from 'dotenv'
dotenv.config();
const PORT = process.env.PORT

const app = express();

// Setup routes
app.use('/api/users', usersRouter);

//Start
app.listen(PORT, () => {
  console.log(`Running on Port: ${PORT}`);
});
