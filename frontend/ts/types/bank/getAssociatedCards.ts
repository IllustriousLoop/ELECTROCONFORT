import type { NextApiRequest, NextApiResponse } from "next";
import GetAllCards from "./getAllCards";

type returnGetAssociatedCards = {
  cards: GetAllCards;
  sum: number;
};

export type HandlerGetAssociatedCards = (
  req: NextApiRequest,
  res: NextApiResponse<returnGetAssociatedCards>
) => Promise<returnGetAssociatedCards | void>;

export default returnGetAssociatedCards;
