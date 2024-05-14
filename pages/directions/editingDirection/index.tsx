import React from "react";
import { useCheckStaff } from "../../../hooks/useCheckStaff";
import { DirectionEditing } from "../../../components/DirectionsComponents/DirectionEditing";

export default function Index() {
  const isStaff = useCheckStaff();

  return isStaff && <DirectionEditing />;
}
