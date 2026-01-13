import React from "react";

import { useCheckStaff } from "../../../hooks/useCheckStaff";
import { UserEditing } from "../../../components/UsersComponents/UserEditing";

export default function Index() {
  const isStaff = useCheckStaff();

  return isStaff && <UserEditing />;
}
