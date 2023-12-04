import { Html, Head, Main, NextScript } from 'next/document'
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Открытые идеи</title>
        <link rel='shortcut icon' href={'./img/favicon.ico'} type="image/x-icon"/>
      </Head>
      <body style={{margin: 0}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
