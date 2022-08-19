import type { NextPage } from "next";
import { Button } from "antd";
import Link from "next/link";
import auth from "../hooks/context/auth";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [{ isAuthenticated }] = useContext(auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push("/auth/signIn");
  }, [isAuthenticated]);

  return (
    <>
      <Link href={"/reconciliation/"}>
        <Button type="primary">Conciliar de Bancos</Button>
      </Link>
    </>
  );
};

export default Home;
