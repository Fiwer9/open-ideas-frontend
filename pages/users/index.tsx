import React from "react";
import { UsersList } from "../../components/UsersComponents/UsersList";
import Cookies from "js-cookie";

export default function Index() {
  Cookies.remove("userId");
  Cookies.remove("userName");
  return (
    <div>
      <UsersList />
    </div>
  );
}
