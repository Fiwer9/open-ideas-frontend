import React from "react";
// import { Charts } from "../../components/AnalyticsComponents/Charts";
import { PageDevelopment } from "../../components/PageDevelopmentComponent/PageDevelopment";
import { useCheckStaff } from "../../hooks/useCheckStaff";

export default function Index() {
  const isStaff = useCheckStaff();
  return (
    <div>
      {/*<Charts />*/}
      {isStaff && <PageDevelopment />}
    </div>
  );
}
