import { Schema } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  token: string;
}

type TStatus = "new" | "in_progress" | "complete";

export interface ITask {
  user: Schema.Types.ObjectId;
  title: string;
  description?: string;
  status: TStatus;
}
