import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import * as slices from "./exports";

export const store = configureStore({
  reducer: {
    ...slices,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
