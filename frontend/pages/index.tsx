import type { NextPage } from "next";
import { Button } from "antd";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Link href={"/reconciliation/"}>
        <Button type="primary">Conciliar de Bancos</Button>
      </Link>
    </>
  );
};

export default Home;
