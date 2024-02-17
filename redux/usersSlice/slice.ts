import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../queriesSlice/types";
import { DetailType } from "../../models/response/ResponseInterface";
import { UserResponse } from "../../models/response/UserResponse";
import {
  fetchCurrentUpdateUser,
  fetchCurrentUser,
  fetchUpdateUsers,
  patchLikes,
} from "./asyncActions";
import { UsersSliceState } from "./types";
import { UsersUpdateResponse } from "../../models/response/UsersUpdateResponse";
import { fetchUsersBuilder, fetchUsersUpdateBuilder } from "./builders";

const initialState: UsersSliceState = {
  users: [],
  usersUpdate: [],
  status: Status.WAITING,
  detail: {},
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setStatusUsers: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setUsers: (state, action: PayloadAction<UserResponse[]>) => {
      state.users = action.payload;
    },
    setCurrentUsers: (state, action: PayloadAction<UsersUpdateResponse[]>) => {
      state.usersUpdate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      if (action.payload.error.is_error) {
        state.detail = action.payload.error.detail as DetailType;
        state.status = Status.ERROR;
        return;
      }
      state.users = action.payload.data;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.status = Status.LOADING;
      state.users = [];
    });
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.status = Status.ERROR;
      state.users = [];
    });

    builder.addCase(fetchCurrentUpdateUser.fulfilled, (state, action) => {
      if (action.payload.error.is_error) {
        state.detail = action.payload.error.detail as DetailType;
        state.status = Status.ERROR;
        return;
      }
      state.usersUpdate = action.payload.data;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchCurrentUpdateUser.pending, (state) => {
      state.status = Status.LOADING;
      state.usersUpdate = [];
    });
    builder.addCase(fetchCurrentUpdateUser.rejected, (state) => {
      state.status = Status.ERROR;
      state.usersUpdate = [];
    });
    builder.addCase(fetchUpdateUsers.fulfilled, (state, action) => {
      if (action.payload.error.is_error) {
        state.detail = action.payload.error.detail as DetailType;
        state.status = Status.ERROR;
        return;
      }
      state.usersUpdate = action.payload.data;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchUpdateUsers.pending, (state) => {
      state.status = Status.LOADING;
      state.usersUpdate = [];
    });
    builder.addCase(fetchUpdateUsers.rejected, (state) => {
      state.status = Status.ERROR;
      state.usersUpdate = [];
    });
    builder.addCase(patchLikes.fulfilled, (state, action) => {
      if (action.payload.error.is_error) {
        state.detail = action.payload.error.detail as DetailType;
        state.status = Status.ERROR;
        return;
      }
      state.status = Status.SUCCESS;
    });
    builder.addCase(patchLikes.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(patchLikes.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { setUsers, setCurrentUsers, setStatusUsers } = usersSlice.actions;

export default usersSlice.reducer;
