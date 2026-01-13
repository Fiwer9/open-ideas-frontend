import React from "react";

import { AdminApplicationCard } from "../../../components/QueryComponents/AdminApplicationCard";
import { useCheckStaff } from "../../../hooks/useCheckStaff";

export default function Index() {
  const isStaff = useCheckStaff();
  return isStaff ? <AdminApplicationCard /> : null;
}
