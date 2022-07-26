import axios from "axios";
import GetSiigoAuxiliary, {
  HandlerGetBankAuxiliary,
} from "../../../ts/types/siigo/getAuxiliary.types";

const handlerGetBankAuxiliary: HandlerGetBankAuxiliary = async (req, res) => {
  const apiUrl = process.env.BACKEND_URL;

  const { data } = await axios.get<GetSiigoAuxiliary>(
    `${apiUrl}/auxiliar/?MES=${req.query.month}`
  );
  res.status(200).json(data);
};

export default handlerGetBankAuxiliary;
