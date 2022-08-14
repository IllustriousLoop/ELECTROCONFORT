import type { NextApiRequest, NextApiResponse } from "next";
import summaryCard, {
  summaryCardData,
} from "../../interfaces/bank/summaryCards.interfaces";

type GetSummaryCards = summaryCard[];
export type SummaryCardsData = summaryCardData[];

export type HandlerGetSummaryCards = (
  req: NextApiRequest,
  res: NextApiResponse<SummaryCardsData>
) => Promise<SummaryCardsData | void>;

export default GetSummaryCards;
