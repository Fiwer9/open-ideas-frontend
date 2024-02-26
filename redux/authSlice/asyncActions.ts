import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthorizationResponse,
  AuthResponse,
  TokenResponse,
} from "../../models/response/AuthResponse";
import AuthService from "../../services/LoginService";
import {
  PostAuthorizationArgs,
  PostCodeConfirmationArgs,
  PutRegistrationArgs,
} from "./types";
import { ResponseInterface } from "../../models/response/ResponseInterface";
import axios from "axios";
import { API_URL_TOKEN } from "../../http";

export const postAuthorization = createAsyncThunk<
  ResponseInterface<AuthorizationResponse>,
  PostAuthorizationArgs
>("auth/postAuthorization", async ({ email, password }) => {
  const { data } = await AuthService.postAuthorization(email, password);
  return data;
});

export const putRegistration = createAsyncThunk<
  ResponseInterface<AuthResponse>,
  PutRegistrationArgs
>("auth/putRegistration", async ({ name, departmentId }) => {
  const { data } = await AuthService.putRegistration(name, departmentId);
  return data;
});

export const postRegistration = createAsyncThunk<
  ResponseInterface<AuthorizationResponse>,
  PostAuthorizationArgs
>("auth/postRegistration", async ({ email, password }) => {
  const { data } = await AuthService.postRegistration(email, password);
  return data;
});

export const postCodeConfirmation = createAsyncThunk<
  ResponseInterface<AuthorizationResponse>,
  PostCodeConfirmationArgs
>("auth/postCodeConfirmation", async ({ code }) => {
  const { data } = await AuthService.confirmEmail(Number(code));
  return data;
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const refresh = localStorage.getItem("token_refresh");
  const response = await axios.post<TokenResponse>(
    `${API_URL_TOKEN}/token/refresh/`,
    { refresh },
    { withCredentials: true }
  );
  localStorage.setItem("token_access", response.data.access);
});
