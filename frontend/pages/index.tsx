import type { NextPage } from "next";
import { Button} from "@mui/material/";
import Link from "next/link";

const Home: NextPage = () => {

  return (
    <>
      <Link href={"/reconciliation/"}>
        <Button variant="contained" color="primary">
          Conciliar de Bancos
        </Button>
      </Link>
    </>
  );
};

export default Home;
