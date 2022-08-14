import React, { FC } from "react";
import CustomTable from "../../table";
import { columnsSummaryCards } from "../../../utils";

import type { SummaryCardsData } from "../../../ts/types/bank/getSummaryCards.types";

interface Props {
  summaryCards: SummaryCardsData;
  selection: {
    selectedRowKeys: React.Key[];
    onChange: (newSelectedRowKeys: React.Key[]) => void;
  };
}

const SummaryCards: FC<Props> = ({ summaryCards, ...props }) => {
  return (
    <CustomTable data={summaryCards} columns={columnsSummaryCards} {...props} />
  );
};

export default SummaryCards;
