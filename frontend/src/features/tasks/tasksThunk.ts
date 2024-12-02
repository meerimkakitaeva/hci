import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../axiosApi";
import { ITask, TTaskMutation, TTaskMutationWithoutUser } from "../../types";

export const createTask = createAsyncThunk<void, TTaskMutation>(
  "tasks/create",
  async (data) => {
    const taskData: TTaskMutation = {
      title: data.title,
      status: data.status,
    };

    if (data.description) {
      taskData.description = data.description;
    }

    await axiosApi.post<ITask>("tasks", taskData, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
);

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const { data } = await axiosApi<ITask[]>("tasks", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  return data;
});

export const deleteTask = createAsyncThunk<void, string>(
  "tasks/deleteTask",
  async (id) => {
    await axiosApi.delete("/tasks/" + id, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
);

export const getOneTask = createAsyncThunk<ITask | null, string>(
  "tasks/getOneTask",
  async (id) => {
    const { data } = await axiosApi.get<ITask | null>("tasks/" + id, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (data) {
      return data;
    }

    return null;
  },
);

export const editTask = createAsyncThunk<void, TTaskMutationWithoutUser>(
  "tasks/editTAsk",
  async (ITask) => {
    const id = ITask._id;
    const task = {
      title: ITask.title,
      status: ITask.status,
      description: ITask.description,
    };

    await axiosApi.put("tasks/" + id, task, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
);
