import React from "react";
import Head from "next/head";

const Favicon = () => {
  return (
    <>
      <Head>
        <title>Открытые идеи</title>
        <link rel='shortcut icon' href={'favicon.ico'} type="image/x-icon"/>
      </Head>
    </>
  );
};

export default Favicon;
