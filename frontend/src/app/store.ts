import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/user/userSlice";
import { tasksReducer } from "../features/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    userStore: userReducer,
    tasksStore: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
