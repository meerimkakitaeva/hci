export interface IUserMutation {
  username: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
}

export interface IUserApi {
  message: string;
  user: IUser;
}

export interface ITask {
  _id: string;
  user: {
    username: string;
    email: string;
  },
  title: string;
  description?: string;
  status: string;
}

export type TTaskMutation = Omit<ITask, "_id" | "user">;
export type TTaskMutationWithoutUser = Omit<ITask, "user">;
