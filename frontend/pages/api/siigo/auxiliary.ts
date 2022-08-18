import axios from "axios";
import GetSiigoAuxiliary, {
  AuxiliaryData,
  HandlerGetSiigoAuxiliary,
} from "../../../ts/types/siigo/getAuxiliary.types";

const handlerGetBankAuxiliary: HandlerGetSiigoAuxiliary = async (req, res) => {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await axios.get<GetSiigoAuxiliary>(
    `${apiUrl}/auxiliar/?MES=${req.query.month}`
  );

  const data: AuxiliaryData = [];

  response.data.forEach((card) => {
    data.push({ key: card.id, ...card });
  });

  res.status(200).json(data);
};

export default handlerGetBankAuxiliary;
