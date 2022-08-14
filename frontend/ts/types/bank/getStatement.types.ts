import type { NextApiRequest, NextApiResponse } from "next";
import statement, {
  statementData,
} from "../../interfaces/bank/statement.interfaces";

type GetBankStatement = statement[];
export type BankStatementData = statementData[];

export type HandlerGetBankStatement = (
  req: NextApiRequest,
  res: NextApiResponse<BankStatementData>
) => Promise<BankStatementData | void>;

export default GetBankStatement;
