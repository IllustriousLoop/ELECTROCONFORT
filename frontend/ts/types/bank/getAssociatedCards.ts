import type { NextApiRequest, NextApiResponse } from "next";
import GetAllCards from "./getAllCards";

type GetAssociatedCards = {
  cards: GetAllCards;
  sum: number;
};

export type HandlerGetAssociatedCards = (
  req: NextApiRequest,
  res: NextApiResponse<GetAssociatedCards>
) => Promise<GetAssociatedCards | void>;

export default GetAssociatedCards;
