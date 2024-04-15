import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../queriesSlice/types";
import { SettingsSliceState } from "./types";
import { DomainsResponse } from "../../models/response/DomainsResponse";
import { SettingsResponse } from "../../models/response/SettingsResponse";
import {
  deleteDomainBuilder,
  fetchDomainsBuilder,
  fetchSettingsBuilder,
  patchDomainBuilder,
  postDomainBuilder,
  putSettingsBuilder,
} from "./builders";
import {
  deleteDomain,
  fetchDomains,
  fetchSettings,
  patchDomain,
  postDomain,
  putSettings,
} from "./asyncActions";
import { getSettings } from "../../utils/getSettings";

const initialState: SettingsSliceState = {
  domains: [],
  settings: getSettings(),
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
    setSettings: (state, action: PayloadAction<SettingsResponse>) => {
      state.settings = action.payload;
    },
  },
  extraReducers: (builder) => {
    fetchDomainsBuilder(builder, fetchDomains);
    fetchSettingsBuilder(builder, fetchSettings);
    postDomainBuilder(builder, postDomain);
    patchDomainBuilder(builder, patchDomain);
    deleteDomainBuilder(builder, deleteDomain);
    putSettingsBuilder(builder, putSettings);
  },
});

export const { setDomains, setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
