import React from "react";
import { AdminApplicationCard } from "../../../components/QueryComponents/AdminApplicationCard";
import {useRouter} from "next/router";

export default function Index() {
  const router = useRouter();
  const { queryId } = router.query;
  let id = Array.isArray(queryId) ? queryId[0] : queryId;
  id = id || "";

  return (
    <div>
      <AdminApplicationCard queryId={id} />
    </div>
  )
}
