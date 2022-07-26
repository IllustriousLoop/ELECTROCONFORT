import axios from "axios";
import type summaryCard from "../../../ts/interfaces/bank/summaryCards.interfaces";
import type GetAllCards from "../../../ts/types/bank/getAllCards";
import type { AllCardsData } from "../../../ts/types/bank/getAllCards";
import { HandlerGetAssociatedCards } from "../../../ts/types/bank/getAssociatedCards";

const handlerGetAssociatedCards: HandlerGetAssociatedCards = async (
  req,
  res
) => {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { id, month } = req.body;
  let sum: number = 0;
  const cards: AllCardsData = [];

  try {
    const card = await axios.get<summaryCard>(
      `${apiUrl}/tarjetasr/${id}/?MES=${month}`
    );

    const response = await axios.post<GetAllCards>(
      `${apiUrl}/tarjetascompleto/ids/?MES=${month}`,
      JSON.stringify(card.data["asociado"]),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    response.data.forEach((item) => {
      cards.push({ key: item.id, ...item });
      sum += item["Vlr Abono"];
    });

  } catch (e: any) {
    console.log(e.message);
  }

  res.status(200).json({ cards, sum });
};

export default handlerGetAssociatedCards;
