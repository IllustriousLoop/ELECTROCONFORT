import React, { FC } from "react";
import CustomTable from "../../table";
import { columnsSummaryCards } from "../../../utils";
import type { SummaryCardsData } from "../../../ts/types/bank/getSummaryCards.types";
import { AllCardsData } from "../../../ts/types/bank/getAllCards";

interface Props {
  summaryCards: SummaryCardsData;
  subSelection: {
    selectedRow: AllCardsData;
    onChange: (i: React.Key[], selectedRow: AllCardsData) => void;
  };
}

const SummaryCards: FC<Props> = ({ summaryCards, subSelection }) => {
  return (
    <CustomTable
      data={summaryCards}
      columns={columnsSummaryCards}
      loading={false}
      subSelection={subSelection}
    />
  );
};

export default SummaryCards;
