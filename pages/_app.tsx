import type { AppProps } from 'next/app'
import Store from "../store/store";
import {createContext} from "react";
import '../styles/variable.scss';

interface State {
    store: Store,
}

const store = new Store();

export const Context = createContext<State>({
    store,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Context.Provider value={{
          store
      }}>
        <Component {...pageProps} />
      </Context.Provider>
  )
}
