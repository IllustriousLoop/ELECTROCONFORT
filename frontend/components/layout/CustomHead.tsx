import Head from "next/head";

type Props = {
  title?: string;
};

const CustomHead = ({ title }: Props) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Conciliador{title ? ` | ${title}` : ""}</title>
    </Head>
  );
};

export default CustomHead;
