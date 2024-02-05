import { Status } from "../redux/queriesSlice/types";

export const getUser = () => {
  try {
    const user = JSON.parse(sessionStorage.getItem("user")) || {
      user_id: 0,
      email: "",
      is_verified: false,
    };
    const status = Status.WAITING;
    return {
      user,
      status,
    };
  } catch (e) {
    return {
      user: {
        user_id: 0,
        email: "",
        is_verified: false,
      },
      status: Status.WAITING,
    };
  }
};
