import React from "react";
import { ApplicationCard } from "../../../components/QueryComponents/ApplicationCard";
import { useRouter } from "next/router";

export default function Index() {
  return (
    <div>
      <ApplicationCard user_status={""} />
    </div>
  );
}
