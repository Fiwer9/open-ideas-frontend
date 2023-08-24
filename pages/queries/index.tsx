import React from "react";
import {QueryList} from "../../components/QueryComponents/QueryList";
import {useAuthenticatedUser} from "../../hooks/useNotRegister";



export default function Index() {
    const isAuthenticated = useAuthenticatedUser();

    return (
        <div>
            {isAuthenticated && (
                <QueryList />
            )}
        </div>
    );
}
