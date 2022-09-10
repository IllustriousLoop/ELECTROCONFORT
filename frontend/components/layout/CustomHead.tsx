import Head from "next/head";

type Props = {
  title?: string;
};

const CustomHead = ({ title }: Props) => {
  const page = title ? ` | ${title}` : "";

  return (
    <Head>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{`Conciliador ${page}`}</title>
    </Head>
  );
};

export default CustomHead;
