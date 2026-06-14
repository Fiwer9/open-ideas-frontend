import React from "react";

import { EditingApplication } from "../../../components/QueryComponents/EditingApplication";
import { useCheckStaff } from "../../../hooks/useCheckStaff";

export default function Index() {
  const isStaff = useCheckStaff();
  return isStaff && <EditingApplication />;
}
