import axios from "axios";
import GetAllCards, {
  AllCardsData,
  HandlerGetAllCards,
} from "../../../ts/types/bank/getAllCards";

const handlerGetAllCards: HandlerGetAllCards = async (req, res) => {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await axios.get<GetAllCards>(
    `${apiUrl}/tarjetascompleto/?MES=${req.query.month}`
  );

  const data: AllCardsData = [];

  response.data.forEach((card) => {
    data.push({ key: card.id, ...card });
  });

  res.status(200).json(data);
};

export default handlerGetAllCards;
