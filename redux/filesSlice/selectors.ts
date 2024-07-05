import {RootState} from "../store";

export const selectStatusFiles = (state: RootState) => state.files.status;