import { Status } from "../redux/queriesSlice/types";
import { AuthorizationState } from "../redux/authSlice/types";
import { getUserIdFromAccessToken } from "./jwt";

const emptyUser = {
  user_id: 0,
  email: "",
  is_verified: false,
};

export const getUser = (): AuthorizationState => {
  if (typeof window === "undefined") {
    return {
      user: emptyUser,
      status: Status.WAITING,
      detail: {},
    };
  }

  try {
    const user = JSON.parse(localStorage.getItem("user") || "null") || {
      ...emptyUser,
    };

    if (!user.user_id || Number(user.user_id) === 0) {
      const userIdFromToken = getUserIdFromAccessToken(
        localStorage.getItem("token_access")
      );

      if (userIdFromToken) {
        user.user_id = userIdFromToken;
        localStorage.setItem("user", JSON.stringify(user));
      }
    }

    return {
      user,
      status: Status.WAITING,
      detail: {},
    };
  } catch {
    return {
      user: emptyUser,
      status: Status.WAITING,
      detail: {},
    };
  }
};
