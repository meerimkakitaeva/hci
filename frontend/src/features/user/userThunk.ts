import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../axiosApi";
import {IUser, IUserApi, IUserLogin, IUserMutation} from "../../types";

export const signUp = createAsyncThunk<void, IUserMutation>(
  "user/signup",
  async (userData) => {
    await axiosApi.post("users", userData);
  },
);

export const signIn = createAsyncThunk<IUser, IUserLogin>(
  "user/sign_in",
  async (userData) => {
    const { data } = await axiosApi.post<IUserApi>("users/sessions", userData);
    localStorage.setItem("token", data.user.token);
    return data.user;
  },
);
