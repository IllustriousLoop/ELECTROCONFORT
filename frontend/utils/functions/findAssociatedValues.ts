import axios from "axios";
import GetSummaryCards from "../../ts/types/bank/getSummaryCards.types";

const findAssociateValues = async (
  summaryCards: GetSummaryCards,
  month: number
) => {
  const { data } = await axios.post(
    `/api/bank/set/associateValues`,
    JSON.stringify({ summaryCards, month }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (data) {
    console.log("Obteniendo valores asociados", data);
  }
};
export default findAssociateValues;
