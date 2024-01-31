import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/LoginService";
import { Status } from "../queriesSlice/slice";
import { getUser } from "../../utils/getUser";
import {
  postAuthorization,
  postCodeConfirmation,
  postRegistration,
} from "./asyncActions";
import { AuthorizationState, PutRegistrationArgs } from "./types";

const initialState: AuthorizationState = getUser();

export const putRegistration = createAsyncThunk(
  "auth/putRegistration",
  async ({ name, departmentId }: PutRegistrationArgs) => {
    await AuthService.putRegistration(name, departmentId);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postAuthorization.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      const user = {
        user_id: action.payload.user_id,
        email: action.payload.email,
        is_verified: action.payload.is_verified,
      };
      state.user = user;
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token_access", action.payload.jwt_access);
      sessionStorage.setItem("token_refresh", action.payload.jwt_refresh);
    });
    builder.addCase(postAuthorization.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(postAuthorization.rejected, (state, action) => {
      state.status = Status.ERROR;
      console.log(action);
    });

    builder.addCase(postRegistration.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      const user = {
        user_id: action.payload.user_id,
        email: action.payload.email,
        is_verified: action.payload.is_verified,
      };
      state.user = user;
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token_access", action.payload.jwt_access);
      sessionStorage.setItem("token_refresh", action.payload.jwt_refresh);
    });

    builder.addCase(postRegistration.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(postRegistration.rejected, (state) => {
      state.status = Status.ERROR;
    });
    builder.addCase(postCodeConfirmation.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });

    builder.addCase(postCodeConfirmation.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(postCodeConfirmation.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(putRegistration.fulfilled, (state) => {
      state.status = Status.SUCCESS;
      state.user.is_verified = true;
    });
    builder.addCase(putRegistration.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(putRegistration.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export default authSlice.reducer;
