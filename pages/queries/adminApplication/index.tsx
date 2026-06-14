import React from "react";
import { Spin } from "antd";

import { AdminApplicationCard } from "../../../components/QueryComponents/AdminApplicationCard";
import { useCheckStaff } from "../../../hooks/useCheckStaff";

export default function Index() {
  const hasAccess = useCheckStaff();

  if (!hasAccess) {
    return (
      <div style={{ padding: 48, textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  return <AdminApplicationCard />;
}
