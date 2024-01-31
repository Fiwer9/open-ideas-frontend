import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthorizationResponse } from "../../models/response/AuthResponse";
import AuthService from "../../services/LoginService";
import { PostAuthorizationArgs, PostCodeConfirmationArgs } from "./types";

export const postAuthorization = createAsyncThunk<
  AuthorizationResponse,
  PostAuthorizationArgs
>("auth/postAuthorization", async ({ email, password }) => {
  const { data } = await AuthService.postAuthorization(email, password);
  return data;
});

export const postRegistration = createAsyncThunk<
  AuthorizationResponse,
  PostAuthorizationArgs
>("auth/postRegistration", async ({ email, password }) => {
  const { data } = await AuthService.postRegistration(email, password);
  return data;
});

export const postCodeConfirmation = createAsyncThunk(
  "auth/postCodeConfirmation",
  async ({ code }: PostCodeConfirmationArgs) => {
    await AuthService.confirmEmail(Number(code));
  }
);
