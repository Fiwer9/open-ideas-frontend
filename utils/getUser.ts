import { Status } from "../redux/queriesSlice/types";
import { AuthorizationState } from "../redux/authSlice/types";

export const getUser = (): AuthorizationState => {
  try {
    const user = JSON.parse(localStorage.getItem("user")) || {
      user_id: 0,
      email: "",
      is_verified: false,
    };
    const status = Status.WAITING;
    return {
      user,
      status,
      detail: {},
    };
  } catch (e) {
    return {
      user: {
        user_id: 0,
        email: "",
        is_verified: false,
      },
      status: Status.WAITING,
      detail: {},
    };
  }
};
