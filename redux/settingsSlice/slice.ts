import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../queriesSlice/types";
import { SettingsSliceState } from "./types";
import { DomainsResponse } from "../../models/response/DomainsResponse";
import { SettingsResponse } from "../../models/response/SettingsResponse";
import { fetchDomainsBuilder, fetchSettingsBuilder } from "./builders";
import { fetchDomains, fetchSettings } from "./asyncActions";

const initialState: SettingsSliceState = {
  domains: [],
  settings: [],
  detail: {},
  status: Status.WAITING,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDomains: (state, action: PayloadAction<DomainsResponse[]>) => {
      state.domains = action.payload;
    },
    setSettings: (state, action: PayloadAction<SettingsResponse[]>) => {
      state.settings = action.payload;
    },
  },
  extraReducers: (builder) => {
    fetchDomainsBuilder(builder, fetchDomains);
    fetchSettingsBuilder(builder, fetchSettings);
  },
});

export const { setDomains, setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
