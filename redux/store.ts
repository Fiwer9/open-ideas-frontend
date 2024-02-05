import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import auth from "./authSlice/slice";
import queries from "./queriesSlice/slice";
import organizations from "./organizationsSlice/slice";

export const store = configureStore({
  reducer: {
    auth,
    queries,
    organizations,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
