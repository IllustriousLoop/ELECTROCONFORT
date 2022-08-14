import axios from "axios";
import allCard from "../../../../ts/interfaces/bank/allCards.interfaces";
import GetAllCards from "../../../../ts/types/bank/getAllCards";
import functionAssociateValues, {
  HandlerSetAssociateValues,
} from "../../../../ts/types/bank/setAssociateValues";
const apiUrl = process.env.BACKEND_URL;

const javascriptDate = (param: any, name: string) =>
  param[name] ? new Date(param[name]).getTime() : "";

const fnEveryDayOfMonth = (mes: number, año: number) => {
  const dias = new Date(año, mes, 0).getDate();
  const diasDelMes = [];
  for (let i = 1; i <= dias; i++) {
    diasDelMes.push(new Date(año, mes - 1, i));
  }
  console.log(diasDelMes);
  return diasDelMes;
};

const terminals: number[] = [15969009, 15969017, 15969066, 15969082, 15969090],
  franchises: string[] = ["DCN", "MNS", "VNS"],
  transactions: number[] = [6, 26, 420, 78];

const configAxios = { timeout: 2700000 };

//F VALE no working very well
const findAssociateValues: functionAssociateValues = async (
  summaryCards,
  month
) => {
  const everyDayOfMonth = fnEveryDayOfMonth(month, 2022);
  terminals.forEach((terminal) => {
    const terminalFilter = summaryCards.filter(
      (extracto) => extracto["Codigo  establec"] === terminal
    );
    franchises.forEach((franchise) => {
      const franchiseFilter = terminalFilter.filter(
        (extracto) => extracto["Franquicia"] === franchise
      );
      everyDayOfMonth.forEach((dia) => {
        const dayFilter = franchiseFilter.filter(
          (extracto) =>
            javascriptDate(extracto, "Fecha de Abono") === dia.getTime()
        );
        transactions.forEach((transaction) => {
          const transactionFilter = dayFilter.filter(
            (extracto) => extracto["Tipo Transaccion"] === transaction
          );
          transactionFilter.forEach(async (extracto) => {
            const { data } = await axios.get<GetAllCards>(
              `${apiUrl}/tarjetascompleto/specific/${terminal}/${franchise}/${dia.getTime()}/${transaction}/?MES=${month}`,
              configAxios
            );

            let sum: number = 0;
            if (data.length === 1) {
              sum = data[0]["Vlr Abono"];
            } else {
              data.forEach((allCard: allCard) => (sum += allCard["Vlr Abono"]));
            }

            if (sum !== extracto["Valor Abono"]) {
              console.log(
                "Error en :",
                `${terminal}-${franchise}-${dia.toLocaleDateString()}-${transaction} con:`,
                extracto,
                data,
                "y",
                sum
              );
            } else {
              let ids: string[] = [];
              data.forEach((allCard: allCard) => ids.push(allCard["id"]));

              const res = await axios.put(
                `${apiUrl}/tarjetasr/${extracto.id}?MES=${everyDayOfMonth}`,
                {
                  asociado: ids,
                },
                configAxios
              );
              console.log("Exitoso", res.data);
            }
          });
        });
      });
    });
  });
};

const handlerSetAssociateValues: HandlerSetAssociateValues = async (
  req,
  res
) => {
  const { summaryCards, month } = req.body;

  await findAssociateValues(summaryCards, month);

  res.status(200).send(true);
};

export default handlerSetAssociateValues;
