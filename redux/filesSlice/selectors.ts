import {RootState} from "../store";

export const selectStatusFiles = (state: RootState) => state.files.status;

export const selectFilesData = (state: RootState) => state.files.files;
