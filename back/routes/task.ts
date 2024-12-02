import express from "express";
import { ITask } from "../types";
import { Task } from "../models/Task";
import auth, { IRequestWithUser } from "../middleware/auth";
import mongoose from "mongoose";

const taskRouter = express.Router();

taskRouter.get("/", auth, async (req, res) => {
  try {
    const userId = (req as IRequestWithUser).user._id;

    const tasks: ITask[] = await Task.find({ user: userId }).populate("user", "username email");

    res.send(tasks);
  } catch (e) {
    return res.sendStatus(500);
  }
});

taskRouter.post("/", auth, async (req, res, next) => {
  try {
    const userId = (req as IRequestWithUser).user._id;
    const { title, description, status } = req.body;

    if (status !== "new" && status !== "in_progress" && status !== "complete") {
      return res
          .status(400)
          .send({ error: " Status be one of new, in progress, complete" });
    }

    const task = new Task({
      user: userId,
      title: title,
      description: description,
      status: status,
    });

    await task.save();
    res.send(task);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

taskRouter.put("/:id", auth, async (req, res) => {
  try {
    const userId = (req as IRequestWithUser).user._id;
    const task_id = req.params.id;

    const task = await Task.findOne({ _id: task_id, user: userId });

    if (!task) {
      return res.status(404).send({ error: "task does not exist" });
    }

    const statusFields = ["new", "in_progress", "complete"];

    if (
        req.body.status &&
        task.status &&
        !statusFields.includes(req.body.status)
    ) {
      return res
          .status(400)
          .send({
            error: "Only three status are allowed: new, in_progress, complete",
          });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    await task.save();

    res.send(task);
  } catch (error) {
    res.sendStatus(403);
  }
});

taskRouter.delete("/:id", auth, async (req, res, next) => {
  try {
    const userId = (req as IRequestWithUser).user._id;
    const task_id = req.params.id;
    const task = await Task.findOne({ _id: task_id });

    if (!task) {
      return res.status(400).send({ error: "Not found!" });
    }

    if (task.user.toString() !== userId.toString()) {
      return res
          .status(403)
          .send({ error: "you can't delete just your tasks!" });
    }

    await Task.deleteOne({ _id: task_id, user: userId });
    return res.send("Successfully deleted");

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

taskRouter.get('/:id', auth,async (req, res) => {
  try {
    const userId = (req as IRequestWithUser).user._id;
    const task_id = req.params.id;

    const task = await Task.findOne({_id: task_id, user: userId});

    if (!task) {
      return res.status(404).send({ error: "Task not found!" });
    }

    return  res.send(task);
  } catch (e) {
    res.sendStatus(403);
  }
});

export default taskRouter;