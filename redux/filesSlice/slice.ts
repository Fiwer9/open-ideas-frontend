import { createSlice } from "@reduxjs/toolkit";
import { FilesSliceState } from "./types";
import { Status } from "../queriesSlice/types";
import { FilesResponse } from "../../models/response/FilesResponse";
import { fetchFiles, postFiles } from "./asyncActions";
import { DetailType } from "../../models/response/ResponseInterface";

const initialState: FilesSliceState = {
    files: [],
    status: Status.WAITING,
    currentFile: {} as FilesResponse,
    detail: {}
}

export const filesSlice = createSlice({
    name: "files",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(postFiles.fulfilled, (state, action) => {
            if (action.payload.error.is_error) {
                state.detail = action.payload.error.detail as DetailType
                state.status = Status.ERROR
                return;
            }
            state.status = Status.SUCCESS;
        })
        builder.addCase(postFiles.pending, state => {
            state.status = Status.LOADING;
        })
        builder.addCase(postFiles.rejected, state => {
            state.status = Status.ERROR;
        })
        builder.addCase(fetchFiles.fulfilled, (state, action) => {
            if (action.payload.error.is_error) {
                state.detail = action.payload.error.detail as DetailType
                state.status = Status.ERROR
                return;
            }
            state.files = action.payload.data
            state.status = Status.SUCCESS;
        })
        builder.addCase(fetchFiles.pending, state => {
            state.status = Status.LOADING;
        })
        builder.addCase(fetchFiles.rejected, state => {
            state.status = Status.ERROR;
        })
    }
})

export default filesSlice.reducer;