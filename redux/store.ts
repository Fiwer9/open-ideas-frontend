import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  auth,
  comments,
  directions,
  filter,
  header,
  menu,
  modals,
  organizations,
  queries,
  settings,
  users,
} from "./exports";

export const store = configureStore({
  reducer: {
    auth,
    queries,
    organizations,
    directions,
    users,
    filter,
    menu,
    comments,
    modals,
    header,
    settings,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
