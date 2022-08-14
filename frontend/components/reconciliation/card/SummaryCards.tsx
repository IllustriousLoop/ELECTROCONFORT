import React, { FC } from "react";
import CustomTable from "../../table";
import { columnsSummaryCards } from "../../../utils";
import type { SummaryCardsData } from "../../../ts/types/bank/getSummaryCards.types";

interface Props {
  summaryCards: SummaryCardsData;
}

const SummaryCards: FC<Props> = ({ summaryCards }) => {
  return <CustomTable data={summaryCards} columns={columnsSummaryCards} />;
};

export default SummaryCards;
