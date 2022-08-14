import axios from "axios";
import GetSummaryCards, {
  HandlerGetSummaryCards,
  SummaryCardsData,
} from "../../../ts/types/bank/getSummaryCards.types";

const handlerGetSummaryCards: HandlerGetSummaryCards = async (req, res) => {
  const apiUrl = process.env.BACKEND_URL;

  const response = await axios.get<GetSummaryCards>(
    `${apiUrl}/tarjetasr/?MES=${req.query.month}`
  );

  const data: SummaryCardsData = [];

  response.data.forEach((item) => {
    data.push({ key: item.id, ...item });
  });

  res.status(200).json(data);
};

export default handlerGetSummaryCards;
