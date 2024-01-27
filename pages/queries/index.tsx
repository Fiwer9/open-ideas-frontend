import React from "react";
import {QueryList} from "../../components/QueryComponents/QueryList";
import {useAuthenticatedUser} from "../../hooks/useNotRegister";
import Cookies from "js-cookie";



export default function Index() {
    Cookies.remove('queryId')
    Cookies.remove('queryName')
    const isAuthenticated = useAuthenticatedUser();

    return (
        <div>
            <QueryList />
        </div>
    );
}
