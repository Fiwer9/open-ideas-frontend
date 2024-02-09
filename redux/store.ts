import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import auth from "./authSlice/slice";
import queries from "./queriesSlice/slice";
import organizations from "./organizationsSlice/slice";
import directions from "./directionsSlice/slice";
import users from "./usersSlice/slice";

export const store = configureStore({
  reducer: {
    auth,
    queries,
    organizations,
    directions,
    users,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
