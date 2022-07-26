import axios from "axios";
import GetSummaryCards, {
  HandlerGetSummaryCards,
} from "../../../ts/types/bank/getSummaryCards.types";

const handlerGetSummaryCards: HandlerGetSummaryCards = async (req, res) => {
  const apiUrl = process.env.BACKEND_URL;

  const { data } = await axios.get<GetSummaryCards>(
    `${apiUrl}/tarjetasr/?MES=${req.query.month}`
  );

  res.status(200).json(data);
};

export default handlerGetSummaryCards;
