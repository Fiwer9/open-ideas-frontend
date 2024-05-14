import React from "react";
import { useCheckStaff } from "../../hooks/useCheckStaff";
import { DirectionsPage } from "../../components/DirectionsComponents/DirectionsPage";

export default function Index() {
  const isStaff = useCheckStaff();

  return isStaff && <DirectionsPage />;
}
