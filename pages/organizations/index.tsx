import React from "react";

import { PageDevelopment } from "../../components/PageDevelopmentComponent/PageDevelopment";
import { useCheckStaff } from "../../hooks/useCheckStaff";

export default function Index() {
  const isStaff = useCheckStaff();

  return (
    <div>
      {/*<OrganizationsList />*/}
      {isStaff && <PageDevelopment />}
    </div>
  );
}
