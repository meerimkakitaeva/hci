import mongoose, { Schema, Types } from "mongoose";
import { User } from "./User";
import { ITask } from "../types";

const taskSchema = new Schema<ITask>({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: "User does not exist!",
    },
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    required: true,
  },
});

export const Task = mongoose.model("Task", taskSchema);
