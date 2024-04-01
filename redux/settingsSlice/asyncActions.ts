import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseInterface } from "../../models/response/ResponseInterface";
import DomainsService from "../../services/DomainsService";
import { DomainsResponse } from "../../models/response/DomainsResponse";
import SettingsService from "../../services/SettingsService";
import { SettingsResponse } from "../../models/response/SettingsResponse";
import { deleteDomainArgs, patchDomainArgs, postDomainArgs } from "./types";

export const fetchDomains = createAsyncThunk<
  ResponseInterface<DomainsResponse[]>
>("settings/fetchDomains", async () => {
  const { data } = await DomainsService.getDomains();
  return data;
});

export const postDomain = createAsyncThunk<
  ResponseInterface<DomainsResponse>,
  postDomainArgs
>("settings/postDomain", async ({ domain }) => {
  const { data } = await DomainsService.postDomain(domain);
  return data;
});

export const patchDomain = createAsyncThunk<
  ResponseInterface<DomainsResponse>,
  patchDomainArgs
>("settings/patchDomain", async ({ id, domain }) => {
  const { data } = await DomainsService.patchDomain(id, domain);
  return data;
});

export const deleteDomain = createAsyncThunk<void, deleteDomainArgs>(
  "settings/deleteDomain",
  async ({ id }) => {
    await DomainsService.deleteDomain(id);
  },
);

export const fetchSettings = createAsyncThunk<
  ResponseInterface<SettingsResponse[]>
>("settings/fetchSettings", async () => {
  const { data } = await SettingsService.getSettings();
  return data;
});
