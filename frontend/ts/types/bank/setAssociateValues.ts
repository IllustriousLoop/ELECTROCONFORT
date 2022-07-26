import type { NextApiRequest, NextApiResponse } from "next";
import GetSummaryCards from "./getSummaryCards.types";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    summaryCards: GetSummaryCards;
    month: number;
  };
}

type functionAssociateValues = (a: GetSummaryCards, b: number) => Promise<void>;

export type HandlerSetAssociateValues = (
  req: ExtendedNextApiRequest,
  res: NextApiResponse<boolean>
) => Promise<boolean | void>;

export default functionAssociateValues;
