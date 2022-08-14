import type { NextApiRequest, NextApiResponse } from "next";
import allCard, { allCardData } from "../../interfaces/bank/allCards";

type GetAllCards = allCard[];
export type AllCardsData = allCardData[];

export type HandlerGetAllCards = (
  req: NextApiRequest,
  res: NextApiResponse<AllCardsData>
) => Promise<AllCardsData | void>;

export default GetAllCards;
