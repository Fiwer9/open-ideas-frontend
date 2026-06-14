import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseInterface } from "../../models/response/ResponseInterface";
import { FilesResponse } from "../../models/response/FilesResponse";
import FilesService from "../../services/FilesService";

export const postFiles = createAsyncThunk<
  ResponseInterface<FilesResponse>,
  FormData
>("files/postFiles", async (formFileData) => {
  const { data } = await FilesService.sendFiles(formFileData);
  return data;
});

export const fetchFiles = createAsyncThunk<ResponseInterface<FilesResponse[]>>(
  "files/getFiles",
  async () => {
    const { data } = await FilesService.getFiles();
    return data;
  }
);
