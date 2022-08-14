import { FC } from "react";
import { AllCardsData } from "../../ts/types/bank/getAllCards";
import { columnsAllCards } from "../../utils";
import CustomTable from "../table";

interface Props {
  allCards: AllCardsData;
  sum: number;
}
const AllCards: FC<Props> = ({ allCards }) => {
  return <CustomTable data={allCards} columns={columnsAllCards} />;
};

export default AllCards;
