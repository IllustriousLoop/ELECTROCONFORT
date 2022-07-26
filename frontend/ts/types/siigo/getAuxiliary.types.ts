import auxiliary from "../../interfaces/siigo/auxiliary.interfaces";
import type { NextApiRequest, NextApiResponse } from "next";

type GetSiigoAuxiliary = auxiliary[];

export type HandlerGetBankAuxiliary = (
  req: NextApiRequest,
  res: NextApiResponse<GetSiigoAuxiliary>
) => Promise<GetSiigoAuxiliary | void>;

export default GetSiigoAuxiliary;
