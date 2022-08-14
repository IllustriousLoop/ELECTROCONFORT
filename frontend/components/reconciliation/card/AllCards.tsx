import axios from "axios";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import GetAssociatedCards from "../../../ts/types/bank/getAssociatedCards";
import { columnsAllCards } from "../../../utils";
import CustomTable from "../../table";

interface Props {
  id: string;
}

const AllCards: FC<Props> = ({ id }) => {
  const [allCardsData, setAllCardsData] = useState<GetAssociatedCards>();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await axios.post<GetAssociatedCards>(
        `/api/bank/associated`,
        JSON.stringify({
          id: id,
          month: router.query.month,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setAllCardsData(res.data);
    })();
  }, [id]);

  return <CustomTable data={allCardsData?.cards} columns={columnsAllCards} />;
};

export default AllCards;
