import type { NextApiRequest, NextApiResponse } from "next";
import auxiliary, {
  auxiliaryData,
} from "../../interfaces/siigo/auxiliary.interfaces";

type GetSiigoAuxiliary = auxiliary[];
export type AuxiliaryData = auxiliaryData[];

export type HandlerGetSiigoAuxiliary = (
  req: NextApiRequest,
  res: NextApiResponse<AuxiliaryData>
) => Promise<AuxiliaryData | void>;

export default GetSiigoAuxiliary;
