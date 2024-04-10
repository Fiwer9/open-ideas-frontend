import React from "react";
import Cookies from "js-cookie";
import { useCheckStaff } from "../../hooks/useCheckStaff";
import UsersList from "../../app/usersList";

export default function Index() {
  const isStaff = useCheckStaff();

  Cookies.remove("userId");
  Cookies.remove("userName");
  return isStaff && <UsersList />;
}
