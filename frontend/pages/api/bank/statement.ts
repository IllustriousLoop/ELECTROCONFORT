import GetSiigoAuxiliary, {
  AuxiliaryData,
  HandlerGetSiigoAuxiliary,
} from "../../../ts/types/siigo/getAuxiliary.types";
import axios from "axios";

const handlerGetBankStatement: HandlerGetSiigoAuxiliary = async (req, res) => {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await axios.get<GetSiigoAuxiliary>(
    `${apiUrl}/extracto/?MES=${req.query.month}`
  );

  const data: AuxiliaryData = [];

  response.data.forEach((item) => {
    data.push({ key: item.id, ...item });
  });

  res.status(200).json(data);
};

export default handlerGetBankStatement;
