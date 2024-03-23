import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseInterface } from "../../models/response/ResponseInterface";
import DomainsService from "../../services/DomainsService";
import { DomainsResponse } from "../../models/response/DomainsResponse";
import SettingsService from "../../services/SettingsService";
import { SettingsResponse } from "../../models/response/SettingsResponse";

export const fetchDomains = createAsyncThunk<
  ResponseInterface<DomainsResponse[]>
>("settings/fetchDomains", async () => {
  const { data } = await DomainsService.getDomains();
  return data;
});

export const fetchSettings = createAsyncThunk<
  ResponseInterface<SettingsResponse[]>
>("settings/fetchSettings", async () => {
  const { data } = await SettingsService.getSettings();
  return data;
});
