import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import AuthService from "../../services/LoginService";
import { AuthorizationResponse } from "../../models/response/AuthResponse";
import { Status } from "./queriesSlice";
import { IUser } from "../../models/IUser";
import { getUser } from "../../utils/getUser";

type AuthorizationState = {
  user: IUser;
  status: Status;
};

const initialState: AuthorizationState = getUser();

type PostAuthorizationArgs = {
  email: string;
  password: string;
};

type PostCodeConfirmationArgs = {
  code: string;
};

type PutRegistrationArgs = {
  name: string;
  departmentId: number;
};
export const postAuthorization = createAsyncThunk<
  AuthorizationResponse,
  PostAuthorizationArgs
>("auth/postAuthorization", async ({ email, password }) => {
  const { data } = await AuthService.postAuthorization(email, password);
  return data;
});

export const postRegistration = createAsyncThunk<
  AuthorizationResponse,
  PostAuthorizationArgs
>("auth/postRegistration", async ({ email, password }) => {
  const { data } = await AuthService.postRegistration(email, password);
  return data;
});

export const postCodeConfirmation = createAsyncThunk(
  "auth/postCodeConfirmation",
  async ({ code }: PostCodeConfirmationArgs) => {
    await AuthService.confirmEmail(Number(code));
  }
);

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

export const selectStatus = (state: RootState) => state.auth.status;
export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
