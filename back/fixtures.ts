import mongoose from "mongoose";
import { User } from "./models/User";
import { Task } from "./models/Task";

const run = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/todo");
  const db = mongoose.connection;

  try {
    await db.dropCollection("users");
    await db.dropCollection("tasks");
  } catch (error) {
    console.log("Collection were not present, skipping drop...");
  }

  const firstUser = new User({
    username: "Bob",
    email: "wer@gmail.com",
    password: "123",
  });

  const secondUser = new User({
    username: "John",
    email: "rt@gmail.com",
    password: "123",
  });

  firstUser.generateToken();
  secondUser.generateToken();

  await firstUser.save();
  await secondUser.save();

  const [firstTask, secondTask] = await Task.create(
    {
      user: firstUser._id,
      title: "learn express js",
      description:
        "study the express js framework to become backend js developer",
      status: "new",
    },
    {
      user: firstUser._id,
      title: "Buy bread",
      status: "in_progress",
    },
    {
      user: firstUser._id,
      title: "Wash dishes",
      status: "complete",
    },
    {
      user: secondUser._id,
      title: "clean up home",
      status: "in_progress",
    },
    {
      user: secondUser._id,
      title: "go to the market",
      description: "go to the market and buy products in the list",
      status: "in_progress",
    },
    {
      user: secondUser._id,
      title: "learn react js",
      description: "study the react js to become frontend js developer",
      status: "in_progress",
    },
      {
        user: secondUser._id,
        title: "новое задание",
        description: "study the react js to become frontend js developer",
        status: "in_progress",
      },
  );

  await db.close();
};

run().catch(console.error);
