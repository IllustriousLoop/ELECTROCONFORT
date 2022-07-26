import type { NextApiRequest, NextApiResponse } from "next";
import summaryCard from "../../interfaces/bank/summaryCards.interfaces";

type GetSummaryCards = summaryCard[];

export type HandlerGetSummaryCards = (
  req: NextApiRequest,
  res: NextApiResponse<GetSummaryCards>
) => Promise<GetSummaryCards | void>;

export default GetSummaryCards;
