import React, { createContext, useEffect } from "react";
import Store from "../store/store";
import router from "next/router";
import NewLogin from "../components/AuthComponents/NewLogin";
//TODO
interface State {
  store: Store;
}

const storeOld = new Store();

export const Context = createContext<State>({
  store: storeOld,
});

export default function Index() {
  useEffect(() => {
    if (sessionStorage.getItem("token_access")) {
      storeOld.checkAuth();
      router.push("/queries");
    }
  }, []);
  return <NewLogin />;
}
