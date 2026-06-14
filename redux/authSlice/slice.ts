import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "../../utils/getUser";
import {
  postAuthorization,
  postCodeConfirmation,
  postRegistration,
  putRegistration,
} from "./asyncActions";
import { AuthorizationState } from "./types";
import { Status } from "../queriesSlice/types";
import {
  DetailType,
  ResponseInterface,
} from "../../models/response/ResponseInterface";
import { AuthorizationResponse } from "../../models/response/AuthResponse";
import { getUserIdFromAccessToken } from "../../utils/jwt";

const initialState: AuthorizationState = getUser();

const withResolvedUserId = (
  user: AuthorizationState["user"],
  accessToken?: string
) => {
  if (user.user_id && Number(user.user_id) > 0) {
    return user;
  }

  const userIdFromToken = getUserIdFromAccessToken(accessToken);

  if (!userIdFromToken) {
    return user;
  }

  return {
    ...user,
    user_id: userIdFromToken,
  };
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setUserId: (state, action: PayloadAction<number>) => {
      state.user.user_id = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      postAuthorization.fulfilled,
      (
        state,
        action: PayloadAction<ResponseInterface<AuthorizationResponse>>
      ) => {
        if (action.payload.error.is_error) {
          state.detail = action.payload.error.detail as unknown as DetailType;
          state.status = Status.ERROR;
          return;
        }

        const user = withResolvedUserId(
          {
            user_id: action.payload.data.user_id,
            email: action.payload.data.email,
            is_verified: action.payload.data.is_verified,
          },
          action.payload.data.jwt_access
        );
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token_access", action.payload.data.jwt_access);
        localStorage.setItem("token_refresh", action.payload.data.jwt_refresh);
        state.status = Status.SUCCESS;
      }
    );
    builder.addCase(postAuthorization.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(postAuthorization.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(postRegistration.fulfilled, (state, action) => {
      if (action.payload.error.is_error) {
        state.detail = action.payload.error.detail as unknown as DetailType;
        state.status = Status.ERROR;
        return;
      }
      state.status = Status.SUCCESS;
    });

    builder.addCase(postRegistration.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(postRegistration.rejected, (state) => {
      state.status = Status.SUCCESS;
    });

    builder.addCase(postCodeConfirmation.fulfilled, (state, action) => {
      if (action.payload.error.is_error) {
        state.detail = action.payload.error.detail as unknown as DetailType;
        state.status = Status.ERROR;
        return;
      }

      const user = withResolvedUserId(
        {
          user_id: action.payload.data.user_id,
          email: action.payload.data.email,
          is_verified: action.payload.data.is_verified,
        },
        action.payload.data.jwt_access
      );
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token_access", action.payload.data.jwt_access);
      localStorage.setItem("token_refresh", action.payload.data.jwt_refresh);
      state.status = Status.SUCCESS;
    });

    builder.addCase(postCodeConfirmation.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(postCodeConfirmation.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(putRegistration.fulfilled, (state, action) => {
      if (action.payload.error.is_error) {
        state.detail = action.payload.error.detail as unknown as DetailType;
        state.status = Status.ERROR;
        return;
      }

      state.user.is_verified = true;
      state.status = Status.SUCCESS;
    });
    builder.addCase(putRegistration.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(putRegistration.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { setStatus, setUserId } = authSlice.actions;

export default authSlice.reducer;
