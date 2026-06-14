import { ResponseInterface } from "../models/response/ResponseInterface";

export const isWrappedApiResponse = <T>(
  payload: unknown
): payload is ResponseInterface<T> => {
  return (
    !!payload &&
    typeof payload === "object" &&
    "error" in payload &&
    typeof (payload as ResponseInterface<T>).error?.is_error === "boolean" &&
    "data" in payload
  );
};

export const unwrapApiResponse = <T>(
  payload: unknown
): { data: T | null; error: string | null } => {
  if (isWrappedApiResponse<T>(payload)) {
    if (payload.error.is_error) {
      const detail = payload.error.detail;

      return {
        data: null,
        error:
          typeof detail === "string"
            ? detail
            : Array.isArray(detail)
              ? detail.map((item) => JSON.stringify(item)).join(", ")
              : "Request failed",
      };
    }

    return { data: payload.data as T, error: null };
  }

  if (payload !== null && payload !== undefined) {
    return { data: payload as T, error: null };
  }

  return { data: null, error: "Empty response" };
};
