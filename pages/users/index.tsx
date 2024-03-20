import React from "react";
import { UsersList } from "../../components/UsersComponents/UsersList";
import Cookies from "js-cookie";
import { useCheckStaff } from "../../hooks/useCheckStaff";

export default function Index() {
  const isStaff = useCheckStaff();

  Cookies.remove("userId");
  Cookies.remove("userName");
  return isStaff && <UsersList />;
}
