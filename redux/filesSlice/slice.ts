import { createSlice } from "@reduxjs/toolkit";
import { FilesSliceState } from "./types";
import { Status } from "../queriesSlice/types";
import { FilesResponse } from "../../models/response/FilesResponse";
import { postFiles } from "./asyncActions";
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
                return
            }
            state.status = Status.SUCCESS
            console.log(action.payload.data)
        })
        builder.addCase(postFiles.pending, state => {
            state.status = Status.LOADING
        })
        builder.addCase(postFiles.rejected, state => {
            state.status = Status.ERROR
        })
    }
})

export default filesSlice.reducer;