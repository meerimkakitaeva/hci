import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import usersRouter from "./routes/user";
import taskRouter from "./routes/task";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use("/users", usersRouter);
app.use("/tasks", taskRouter);

const run = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/todo");

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch((e) => console.error(e));
