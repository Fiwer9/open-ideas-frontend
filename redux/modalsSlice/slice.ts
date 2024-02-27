import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ModalsSliceState = {
  isModalSubmitActive: false,
  isModalResetActive: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    changeIsModalSubmitActive: (state, action: PayloadAction<boolean>) => {
      state.isModalSubmitActive = action.payload;
    },
    changeIsModalResetActive: (state, action: PayloadAction<boolean>) => {
      state.isModalResetActive = action.payload;
    },
  },
});

export const { changeIsModalSubmitActive, changeIsModalResetActive } =
  modalsSlice.actions;
export default modalsSlice.reducer;
