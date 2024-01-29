import React from "react";
import { EditingApplication } from "../../../components/QueryComponents/EditingApplication";
import {useRouter} from "next/router";

export default function Index() {
  const router = useRouter();
  const { queryId } = router.query;
  let id = Array.isArray(queryId) ? queryId[0] : queryId;
  id = id || "";
  return (
    <div>
      <EditingApplication queryId={id} />
    </div>
  )
}
