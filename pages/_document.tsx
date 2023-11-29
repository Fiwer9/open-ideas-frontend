import { Html, Head, Main, NextScript } from 'next/document'
import Favicon from "../components/FaviconComponents/Favicon";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Favicon />
      <body style={{margin: 0}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
