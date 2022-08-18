import { FC } from "react";
import { columnsAllCards } from "../../../utils";
import CustomTable from "../../table";
import { AllCardsData } from "../../../ts/types/bank/getAllCards";
import useFetchAllCards from "../../../hooks/requests/useFetchAllCards";

interface Props {
  id: string;
  selection?: {
    selectedRow: AllCardsData;
    onChange: (i: React.Key[], selectedRow: AllCardsData) => void;
  };
}

const AllCards: FC<Props> = ({ id, selection }) => {
  const { data, loading } = useFetchAllCards(id);
  return (
    <CustomTable
      data={data}
      columns={columnsAllCards}
      loading={loading}
      selection={selection}
    />
  );
};

export default AllCards;
