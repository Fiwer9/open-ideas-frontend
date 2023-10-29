import React from "react";
import { EditingApplication } from "../../../components/QueryComponents/EditingApplication";
import {useAuthenticatedUser} from "../../../hooks/useNotRegister";
import {useRouter} from "next/router";

export default function Index() {
  const isAuthenticated = useAuthenticatedUser();
  const router = useRouter();
  const { queryId } = router.query;
  let id = Array.isArray(queryId) ? queryId[0] : queryId;
  id = id || "";
  return (
    <div>
      {isAuthenticated&& (
        <EditingApplication queryId={id} />
      )}
    </div>
  )
}
