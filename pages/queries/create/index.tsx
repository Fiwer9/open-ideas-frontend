import React from "react";
import {CreateQuery} from "../../../components/QueryComponents/CreateQuery";
import {useAuthenticatedUser} from "../../../hooks/useNotRegister";

export default function Index() {
    const isAuthenticated = useAuthenticatedUser();
    return (
        <div>
            {isAuthenticated && (
                <CreateQuery />
            )}
        </div>
    )
}
