import { RootState } from "../store";

export const selectDomains = (state: RootState) => state.settings.domains;
