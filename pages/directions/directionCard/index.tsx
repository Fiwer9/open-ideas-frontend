import React from "react";

import { useCheckStaff } from "../../../hooks/useCheckStaff";
import DirectionCard from "../../../components/DirectionsComponents/DirectionCard";

export default function Index() {
  const isStaff = useCheckStaff();

  return isStaff && <DirectionCard />;
}
