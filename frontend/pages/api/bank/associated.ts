import axios from "axios";
import type allCard from "../../../ts/interfaces/bank/allCards";
import type summaryCard from "../../../ts/interfaces/bank/summaryCards.interfaces";
import type GetAllCards from "../../../ts/types/bank/getAllCards";
import { HandlerGetAssociatedCards } from "../../../ts/types/bank/getAssociatedCards";

const handlerGetAssociatedCards: HandlerGetAssociatedCards = async (
  req,
  res
) => {
  const apiUrl = process.env.BACKEND_URL;

  const { id, month } = req.body;
  let sum: number = 0;
  let cards = <GetAllCards>[];

  try {
    const card = await axios.get<summaryCard>(
      `${apiUrl}/tarjetasr/${id}/?MES=${month}`
    );

    const { data } = await axios.post<GetAllCards>(
      `${apiUrl}/tarjetascompleto/ids/?MES=${month}`,
      JSON.stringify(card.data["asociado"]),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    data.forEach((e: allCard) => (sum += e["Vlr Abono"]));

    cards = data;
  } catch (e: any) {
    console.log(e.message);
  }

  res.status(200).json({ cards, sum });
};

export default handlerGetAssociatedCards;
