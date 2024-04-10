import React from "react";
import { useCheckStaff } from "../../hooks/useCheckStaff";
import Settings from "../../app/settings";

export default function Index() {
  const isStaff = useCheckStaff();
  return isStaff && <Settings />;
}
