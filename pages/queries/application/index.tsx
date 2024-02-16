import React from "react";
import { ApplicationCard } from "../../../components/QueryComponents/ApplicationCard";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const { queryId } = router.query;
  let id = Array.isArray(queryId) ? queryId[0] : queryId;
  id = id || "";

  return (
    <div>
      <ApplicationCard user_status={""} />
    </div>
  );
}
