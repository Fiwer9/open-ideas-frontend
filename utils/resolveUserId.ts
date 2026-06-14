import UsersService from "../services/UsersService";
import { UserResponse } from "../models/response/UserResponse";
import { getUserIdFromAccessToken } from "./jwt";
import { unwrapApiResponse } from "./unwrapApiResponse";

export const resolveUserId = async (
  userId?: string | number,
  email?: string
): Promise<number | null> => {
  const normalizedId = Number(userId);

  if (Number.isFinite(normalizedId) && normalizedId > 0) {
    return normalizedId;
  }

  if (typeof window !== "undefined") {
    const tokenUserId = getUserIdFromAccessToken(
      localStorage.getItem("token_access")
    );

    if (tokenUserId) {
      return tokenUserId;
    }
  }

  if (!email) {
    return null;
  }

  try {
    const { data: responsePayload } = await UsersService.getUsersByName(email);
    const { data: users } = unwrapApiResponse<UserResponse[]>(responsePayload);
    const matchedUser =
      users?.find((user) => user.email === email) ?? users?.[0];

    return matchedUser?.id ?? null;
  } catch {
    return null;
  }
};
