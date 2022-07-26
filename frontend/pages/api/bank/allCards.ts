import axios from "axios";
import GetAllCards, {
  HandlerGetAllCards,
} from "../../../ts/types/bank/getAllCards";

const handlerGetAllCards: HandlerGetAllCards = async (req, res) => {
  const apiUrl = process.env.BACKEND_URL;

  const { data } = await axios.get<GetAllCards>(
    `${apiUrl}/tarjetascompleto/?MES=${req.query.month}`
  );

  res.status(200).json(data);
};

export default handlerGetAllCards;
