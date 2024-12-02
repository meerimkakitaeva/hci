import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types";
import { signIn, signUp } from "./userThunk";

interface AuthState {
  user: IUser | null;
  createLoading: boolean;
  error: boolean;
}

const initialState: AuthState = {
  user: null,
  createLoading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.createLoading = false;
      state.error = true;
    });

    builder.addCase(signIn.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload: userData }) => {
      state.createLoading = false;
      state.user = userData;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.createLoading = false;
      state.error = true;
    });
  },
});

export const userReducer = userSlice.reducer;
