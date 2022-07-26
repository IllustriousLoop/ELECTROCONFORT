import type { NextApiRequest, NextApiResponse } from "next";
import statement from "../../interfaces/bank/statement.interfaces";

type GetBankStatement = statement[];

export type HandlerGetBankStatement = (
  req: NextApiRequest,
  res: NextApiResponse<GetBankStatement>
) => Promise<GetBankStatement | void>;

export default GetBankStatement;
