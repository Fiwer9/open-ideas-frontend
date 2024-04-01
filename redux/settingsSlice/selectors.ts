import { RootState } from "../store";

export const selectDomains = (state: RootState) => state.settings.domains;
export const selectSettings = (state: RootState) => state.settings.settings;
