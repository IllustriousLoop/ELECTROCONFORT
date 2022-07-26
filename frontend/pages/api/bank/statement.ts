import GetBankStatement, {
  HandlerGetBankAuxiliary,
} from "../../../ts/types/siigo/getAuxiliary.types";
import axios from "axios";

const handlerGetBankStatement: HandlerGetBankAuxiliary = async (req, res) => {
  const apiUrl = process.env.BACKEND_URL;

  const { data } = await axios.get<GetBankStatement>(
    `${apiUrl}/extracto/?MES=${req.query.month}`
  );

  res.status(200).json(data);
};

export default handlerGetBankStatement;
