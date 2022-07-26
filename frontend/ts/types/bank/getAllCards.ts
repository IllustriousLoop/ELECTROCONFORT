import type { NextApiRequest, NextApiResponse } from "next";
import allCard from "../../interfaces/bank/allCards";

type GetAllCards = allCard[];

export type HandlerGetAllCards = (
  req: NextApiRequest,
  res: NextApiResponse<GetAllCards>
) => Promise<GetAllCards | void>;

export default GetAllCards;
