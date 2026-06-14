import { ResponseInterface } from "../models/response/ResponseInterface";
import { UserRatingResponse } from "../models/response/UserRatingResponse";

type RatingListPayload =
  | ResponseInterface<UserRatingResponse[] | { results: UserRatingResponse[]; count?: number }>
  | UserRatingResponse[]
  | { results: UserRatingResponse[]; count?: number }
  | null
  | undefined;

export const normalizeRatingList = (
  payload: RatingListPayload
): { items: UserRatingResponse[]; count: number } => {
  if (!payload) {
    return { items: [], count: 0 };
  }

  if (Array.isArray(payload)) {
    return { items: payload, count: payload.length };
  }

  if ("error" in payload && "data" in payload) {
    return normalizeRatingList(payload.data as RatingListPayload);
  }

  if (Array.isArray(payload.results)) {
    return {
      items: payload.results,
      count: payload.count ?? payload.results.length,
    };
  }

  return { items: [], count: 0 };
};

export const getResponseErrorMessage = (
  payload: ResponseInterface<unknown> | undefined,
  fallback = "Не удалось загрузить рейтинг"
) => {
  if (!payload?.error?.is_error) {
    return null;
  }

  if (typeof payload.error.detail === "string") {
    return payload.error.detail;
  }

  return fallback;
};
