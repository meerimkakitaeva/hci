import mongoose, {Schema, Types} from "mongoose";
import {User} from "./User";
import {ITask} from "../types";

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
  date: {
    type: String,
  },
  description: String,
  priority: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
});

export const Task = mongoose.model("Task", taskSchema);
