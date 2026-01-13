import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HeaderSliceState } from "./types";
import { DetailType } from "../../models/response/ResponseInterface";
import { Status } from "../queriesSlice/types";
import { fetchUserHeader, fetchOrganizationHeader } from "./asyncActions";

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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserHeader.fulfilled, (state, action) => {
      if (action.payload.error.is_error) {
        state.detail = action.payload.error.detail as DetailType;
        state.status = Status.ERROR;
        return;
      }
      state.userName = action.payload.data.name;
      state.department = action.payload.data.department?.name;
      state.organizationId = action.payload.data.department?.organization;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchUserHeader.pending, (state) => {
      state.status = Status.LOADING;
      state.userName = "";
    });
    builder.addCase(fetchUserHeader.rejected, (state) => {
      state.status = Status.ERROR;
      state.userName = "";
    });
    builder.addCase(fetchOrganizationHeader.fulfilled, (state, action) => {
      if (action.payload.error.is_error) {
        state.detail = action.payload.error.detail as DetailType;
        state.status = Status.ERROR;
        return;
      }
      state.organization = action.payload.data.name;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchOrganizationHeader.pending, (state) => {
      state.status = Status.LOADING;
      state.organization = "";
    });
    builder.addCase(fetchOrganizationHeader.rejected, (state) => {
      state.status = Status.ERROR;
      state.organization = "";
    });
  },
});

export const { setDepartment, setOrganization, setUserName, setUserStatus } =
  headerSlice.actions;

export default headerSlice.reducer;
