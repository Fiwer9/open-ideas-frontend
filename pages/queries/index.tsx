import React from "react";
import {QueryList} from "../../components/QueryComponents/QueryList";
import Cookies from "js-cookie";
import {useAuthenticatedUser} from "../../hooks/useNotRegister";



export default function Index() {
    const isAuthenticated = useAuthenticatedUser();
    Cookies.remove('queryId')
    Cookies.remove('queryName')

    return (
        <div>
            {isAuthenticated && (
                <QueryList />
            )}
        </div>
    );
}
