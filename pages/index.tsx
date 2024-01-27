import React, {createContext, useEffect} from "react";
import Store from "../store/store";
import router from "next/router";
import NewLogin from "../components/AuthComponents/NewLogin";

interface State {
    store: Store,
}

const store = new Store();

export const Context = createContext<State>({
    store,
})

export default function Index() {
    useEffect(() => {
        if(sessionStorage.getItem('user_id')) {
            router.push('/queries')
        }
    }, [])
    return (
        <div>
            <NewLogin />
        </div>
    )
}
