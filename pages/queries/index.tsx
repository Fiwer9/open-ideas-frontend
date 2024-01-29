import React from "react";
import {QueryList} from "../../components/QueryComponents/QueryList";
import Cookies from "js-cookie";



export default function Index() {
    Cookies.remove('queryId')
    Cookies.remove('queryName')

    return (
        <div>
            <QueryList />
        </div>
    );
}
