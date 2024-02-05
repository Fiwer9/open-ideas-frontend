import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../queriesSlice/types";
import { OrganizationsResponse } from "../../models/response/OrganizationsResponse";
import { fetchDepartments, fetchOrganizations } from "./asyncActions";
import { OrganizationsSliceState } from "./types";
import { IDepartment } from "../../models/IDepartment";

const initialState: OrganizationsSliceState = {
  organizations: [],
  departments: [],
  status: Status.LOADING,
};

export const organizationsSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    setOrganizations: (
      state,
      action: PayloadAction<OrganizationsResponse[]>
    ) => {
      state.organizations = action.payload;
    },
    setDepartments: (state, action: PayloadAction<IDepartment[]>) => {
      state.departments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrganizations.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.organizations = action.payload;
    });
    builder.addCase(fetchOrganizations.pending, (state) => {
      state.status = Status.LOADING;
      state.organizations = [];
    });
    builder.addCase(fetchOrganizations.rejected, (state) => {
      state.status = Status.ERROR;
      state.organizations = [];
    });

    builder.addCase(fetchDepartments.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.departments = action.payload;
    });
    builder.addCase(fetchDepartments.pending, (state) => {
      state.status = Status.LOADING;
      state.departments = [];
    });
    builder.addCase(fetchDepartments.rejected, (state) => {
      state.status = Status.ERROR;
      state.departments = [];
    });
  },
});

export const { setOrganizations } = organizationsSlice.actions;

export default organizationsSlice.reducer;
