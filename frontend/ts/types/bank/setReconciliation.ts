import type { NextApiRequest, NextApiResponse } from "next";
import GetBankStatement from "./getStatement.types";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    statement: GetBankStatement;
    month: number;
  };
}

type functionReconciliation = (
  a: GetBankStatement,
  b: number
) => Promise<boolean> | void;

export type HandlerSetReconciliation = (
  req: ExtendedNextApiRequest,
  res: NextApiResponse<boolean>
) => Promise<boolean | void>;

export default functionReconciliation;
