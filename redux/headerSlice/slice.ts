import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { HeaderSliceState } from "./types";
import { DetailType } from "../../models/response/ResponseInterface";
import { Status } from "../queriesSlice/types";
import { fetchAccountHeader } from "./asyncActions";

const initialState: HeaderSliceState = {
  userName: "",
  organization: "",
  department: "",
  organizationId: 0,
  detail: {},
  status: Status.WAITING,
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setOrganization: (state, action: PayloadAction<string>) => {
      state.organization = action.payload;
    },
    setDepartment: (state, action: PayloadAction<string>) => {
      state.department = action.payload;
    },
    setUserStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    resetAccountHeader: (state) => {
      state.userName = "";
      state.organization = "";
      state.department = "";
      state.organizationId = 0;
      state.status = Status.WAITING;
      state.detail = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccountHeader.fulfilled, (state, action) => {
      state.userName = action.payload.userName;
      state.department = action.payload.department;
      state.organization = action.payload.organization;
      state.organizationId = action.payload.organizationId;
      state.status = Status.SUCCESS;
      state.detail = {};
    });
    builder.addCase(fetchAccountHeader.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchAccountHeader.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const {
  setDepartment,
  setOrganization,
  setUserName,
  setUserStatus,
  resetAccountHeader,
} = headerSlice.actions;

export default headerSlice.reducer;
