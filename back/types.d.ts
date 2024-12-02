import {ObjectId} from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  token: string;
}

export interface ITask {
  user: ObjectId
  title: string;
  date: string;
  description: string;
  priority: string;
  status: string;
}
