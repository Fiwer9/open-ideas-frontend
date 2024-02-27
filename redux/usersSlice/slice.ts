import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../queriesSlice/types";
import { DetailType } from "../../models/response/ResponseInterface";
import { UserResponse } from "../../models/response/UserResponse";
import {
  fetchCurrentUpdateUser,
  fetchCurrentUser,
  fetchUpdateUsers,
  fetchUsers,
  patchLikes,
} from "./asyncActions";
import { UsersSliceState } from "./types";
import { UsersUpdateResponse } from "../../models/response/UsersUpdateResponse";
import {
  fetchUsersBuilder,
  fetchUsersUpdateBuilder,
  patchLikesBuilder,
} from "./builders";

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
    setUpdateUsers: (state, action: PayloadAction<UsersUpdateResponse[]>) => {
      state.usersUpdate = action.payload;
    },
  },
  extraReducers: (builder) => {
    fetchUsersBuilder(builder, fetchCurrentUser);
    fetchUsersBuilder(builder, fetchUsers);
    fetchUsersUpdateBuilder(builder, fetchCurrentUpdateUser);
    fetchUsersUpdateBuilder(builder, fetchUpdateUsers);
    patchLikesBuilder(builder, patchLikes);
  },
});

export const { setUsers, setUpdateUsers, setStatusUsers } = usersSlice.actions;

export default usersSlice.reducer;
