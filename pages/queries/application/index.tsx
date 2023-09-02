import React from "react";
import {ApplicationCard} from "../../../components/QueryComponents/ApplicationCard";
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
                <ApplicationCard queryId={id} user_status={''}/>
            )}

        </div>
    )
}
