import React from "react";
import {ExpertApplicationCard} from "../../../components/QueryComponents/ExpertApplicationCard";
import {useRouter} from "next/router";
import {useAuthenticatedUser} from "../../../hooks/useNotRegister";

export default function Index() {
    const isAuthenticated = useAuthenticatedUser();
    const router = useRouter();
    const { queryId } = router.query;
    let id = Array.isArray(queryId) ? queryId[0] : queryId;
    id = id || "";
    return (
        <div>
            {isAuthenticated && (
                <ExpertApplicationCard queryId={id}/>
            )}
        </div>
    )
}
