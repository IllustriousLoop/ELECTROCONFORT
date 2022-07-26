import Head from "next/head";
import React from "react";

type Props = {
  children: JSX.Element;
};

const Main = ({ children }: Props) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Electroconfort</title>
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Main;
