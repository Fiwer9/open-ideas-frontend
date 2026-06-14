import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ConfigProvider, theme } from "antd";
import ruRU from "antd/locale/ru_RU";
import { Provider } from "react-redux";

import "../styles/app-global.scss";
import "../styles/variable.scss";
import { store } from "../redux/store";

const fontFamily =
  "var(--font-inter), -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ConfigProvider
        locale={ruRU}
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            fontFamily,
          },
        }}
      >
        <Head>
          <title>Открытые идеи</title>
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ConfigProvider>
    </>
  );
}
