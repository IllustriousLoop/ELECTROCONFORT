import type { NextApiRequest, NextApiResponse } from "next";
import { AllCardsData } from "./getAllCards";

type GetAssociatedCards = {
  cards: AllCardsData;
  sum: number;
};

export type HandlerGetAssociatedCards = (
  req: NextApiRequest,
  res: NextApiResponse<GetAssociatedCards>
) => Promise<GetAssociatedCards | void>;

export default GetAssociatedCards;
