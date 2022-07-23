import type { NextPage } from "next";
import { Button, TextField } from "@mui/material/";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";

const Home: NextPage = (props) => {
  const [MES, setMES] = useState(0);

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Electroconfort</title>
      </Head>
      <TextField
        label="Numero de mes"
        variant="filled"
        type="number"
        value={MES}
        onChange={(e) => setMES(e.target.value)}
      />
      <Link href={`/conciliar/${MES}`}>
        <Button variant="contained" color="primary">
          Go
        </Button>
      </Link>
    </>
  );
};

export default Home;
