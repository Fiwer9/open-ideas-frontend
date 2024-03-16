import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../queriesSlice/types";
import { UserResponse } from "../../models/response/UserResponse";
import {
  fetchCurrentUser,
  fetchUsers,
  fetchUsersByName,
  patchLikes,
  patchUser,
} from "./asyncActions";
import { UsersSliceState } from "./types";
import {
  fetchUserBuilder,
  fetchUsersBuilder,
  patchLikesBuilder,
} from "./builders";

const initialState: UsersSliceState = {
  users: [],
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
  },
  extraReducers: (builder) => {
    fetchUserBuilder(builder, fetchCurrentUser);
    fetchUsersBuilder(builder, fetchUsers);
    fetchUsersBuilder(builder, fetchUsersByName);
    patchLikesBuilder(builder, patchLikes);
    fetchUsersBuilder(builder, patchUser);
  },
});

export const { setUsers, setStatusUsers } = usersSlice.actions;

export default usersSlice.reducer;
