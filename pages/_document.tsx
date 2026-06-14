import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta name="color-scheme" content="light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap&subset=cyrillic,latin"
          rel="stylesheet"
        />
        <link
          rel="shortcut icon"
          href="/img/favicon.ico"
          type="image/x-icon"
        />
      </Head>
      <body style={{ margin: 0, backgroundColor: "#fff", color: "#000" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
