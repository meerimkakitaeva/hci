import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ITask } from "../../types";
import {
  createTask,
  deleteTask,
  editTask,
  fetchTasks,
  getOneTask,
} from "./tasksThunk";

interface TasksState {
  tasks: ITask[];
  oneTask: ITask | null;
  isOpen: boolean;
  createLoading: boolean;
  editLoading: boolean;
  fetchLoading: boolean;
  fetchOneLoading: string;
  deleteLoading: string;
  error: boolean;
}

const initialState: TasksState = {
  tasks: [],
  oneTask: null,
  isOpen: false,
  createLoading: false,
  editLoading: false,
  fetchLoading: false,
  fetchOneLoading: "",
  deleteLoading: "",
  error: false,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    onOpen(state) {
      state.isOpen = true;
    },
    onClose(state) {
      state.isOpen = false;
    },
    cleanOneTask(state) {
      state.oneTask = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTask.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createTask.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createTask.rejected, (state) => {
      state.createLoading = false;
      state.error = true;
    });

    builder.addCase(fetchTasks.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, { payload: tasks }) => {
      state.fetchLoading = false;
      state.tasks = tasks;
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.fetchLoading = false;
      state.error = true;
    });

    builder.addCase(deleteTask.pending, (state, action) => {
      state.deleteLoading = action.meta.arg;
    });
    builder.addCase(deleteTask.fulfilled, (state) => {
      state.deleteLoading = "";
    });
    builder.addCase(deleteTask.rejected, (state) => {
      state.deleteLoading = "";
    });

    builder.addCase(getOneTask.pending, (state, action) => {
      state.fetchOneLoading = action.meta.arg;
    });
    builder.addCase(getOneTask.fulfilled, (state, { payload }) => {
      state.fetchOneLoading = "";
      state.oneTask = payload;
    });
    builder.addCase(getOneTask.rejected, (state) => {
      state.fetchOneLoading = "true";
    });

    builder.addCase(editTask.pending, (state) => {
      state.editLoading = true;
    });
    builder.addCase(editTask.fulfilled, (state) => {
      state.editLoading = false;
    });
    builder.addCase(editTask.rejected, (state) => {
      state.editLoading = false;
      state.error = true;
    });
  },
});

export const tasksReducer = tasksSlice.reducer;
export const { onOpen, onClose, cleanOneTask } = tasksSlice.actions;
export const selectOneTask = (state: RootState) => state.tasksStore.oneTask;
export const selectTasks = (state: RootState) => state.tasksStore.tasks;
export const selectIsOpen = (state: RootState) => state.tasksStore.isOpen;
export const taskLoading = (state: RootState) => state.tasksStore.fetchOneLoading;
