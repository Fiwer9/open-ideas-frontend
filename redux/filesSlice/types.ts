import {FilesResponse} from "../../models/response/FilesResponse";
import {Status} from "../queriesSlice/types";
import {DetailType} from "../../models/response/ResponseInterface";

export interface PostFilesArgs {
    query: number,
    query_draft: number,
    file: string
}

export interface FilesSliceState {
    files: FilesResponse[],
    status: Status,
    detail: DetailType,
    currentFile: FilesResponse
}