import React from "react";
import { AdminApplicationCard } from "../../../components/QueryComponents/AdminApplicationCard";
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
      {isAuthenticated && (
        <AdminApplicationCard queryId={id} />
        )}
    </div>
  )
}
