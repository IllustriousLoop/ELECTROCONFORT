import axios from "axios";
import statement from "../../../../ts/interfaces/bank/statement.interfaces";
import auxiliary from "../../../../ts/interfaces/siigo/auxiliary.interfaces";
import functionReconciliation, {
  HandlerSetReconciliation,
} from "../../../../ts/types/bank/setReconciliation";
import GetSiigoAuxiliary from "../../../../ts/types/siigo/getAuxiliary.types";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
type fnDays = (date: string, days: number) => Date;

const addDays: fnDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
const removeDays: fnDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

const configAxios = { timeout: 2700000 };

const setBankingCharges: functionReconciliation = async (statements, month) => {
  const statementsFilter = statements.filter(
    (record) =>
      record["DESCRIPCION"].startsWith("Cobro ") ||
      record["DESCRIPCION"].includes("Gravamen ") ||
      (record["DESCRIPCION"].includes("IVA ") && record["CREDITO"] === 0)
  );

  try {
    const update = async (record: statement) => {
      await axios.put(
        `${apiUrl}/extracto/${record.id}/?MES=${month}`,
        {
          TIPO: ["gasto"],
        },
        configAxios
      );
    };

    statementsFilter.forEach(update);

    return true;
  } catch (error: any) {
    console.log("bankingCharges", error.message);
    return false;
  }
};

const setCards: functionReconciliation = async (statements, month) => {
  const statementsFilter = statements.filter(
    (record) =>
      record["DESCRIPCION"].startsWith("Nc Master") ||
      record["DESCRIPCION"].startsWith("Nd Master") ||
      record["DESCRIPCION"].startsWith("Nc Visa") ||
      record["DESCRIPCION"].startsWith("Nd Visa") ||
      record["DESCRIPCION"].startsWith("Nc Diners") ||
      record["DESCRIPCION"].startsWith("Nc Diners")
  );

  try {
    const update = async (record: statement) => {
      await axios.put(
        `${apiUrl}/extracto/${record.id}/?MES=${month}`,
        {
          TIPO: "tarjeta",
        },
        configAxios
      );
    };

    statementsFilter.forEach(update);

    return true;
  } catch (error: any) {
    console.log("Cards", error.message);
    return false;
  }
};

const setCredits: functionReconciliation = async (statements, month) => {
  const statementsFilter = statements.filter(
    (record) => record["DEBITO"] !== 0 && record["TIPO"].length === 0
  );

  try {
    const res = await axios.get<GetSiigoAuxiliary>(
      `${apiUrl}/auxiliar/all/CREDITOS/?MES=${month}`
    );
    const auxiliaries: GetSiigoAuxiliary = res.data;

    const update = async (statement: statement, auxiliary: auxiliary) => {
      if (statement["DEBITO"] === auxiliary["CREDITOS"]) {
        await axios.put(
          `${apiUrl}/extracto/${statement.id}/?MES=${month}`,
          {
            TIPO: "credito",
            // asociado: aux.id,
          },
          configAxios
        );
      }
    };

    statementsFilter.forEach((statement) => {
      auxiliaries.forEach((auxiliary) => update(statement, auxiliary));
    });

    return true;
  } catch (error: any) {
    console.log("creditos", error.message);
    return false;
  }
};

const debitos: functionReconciliation = (statements, month) => {
  const statementsFilter = statements.filter(
    (record) => record["CREDITO"] !== 0 && record["TIPO"].length === 0
  );

  const update = (statement: statement, auxiliary: auxiliary) => {
    const updateExtract = () => {
      axios
        .put(`${apiUrl}/extracto/${statement.id}/?MES=${month}`, {
          TIPO: "debitos",
          // asociado: aux.id,
        })
        .then(() => {
          console.log(
            "update",
            statement["CREDITO"],
            auxiliary["DEBITOS"],
            statement.id
          );
        })
        .catch((err) => {
          console.log(statement.id, auxiliary.id, err);
        });
    };
    if (
      statement["CREDITO"] === auxiliary["DEBITOS"] &&
      statement["FECHA"] === auxiliary["FECHA"]
    ) {
      updateExtract();
    }
    if (
      statement["CREDITO"] === auxiliary["DEBITOS"] &&
      new Date(statement["FECHA"]).getTime() ===
        addDays(auxiliary["FECHA"], 1).getTime()
    ) {
      updateExtract();
    } else if (
      statement["CREDITO"] === auxiliary["DEBITOS"] &&
      addDays(statement["FECHA"], 1).getTime() ==
        new Date(auxiliary["FECHA"]).getTime()
    ) {
      updateExtract();
    } else if (
      statement["CREDITO"] === auxiliary["DEBITOS"] &&
      new Date(statement["FECHA"]).getTime() ===
        removeDays(auxiliary["FECHA"], 1).getTime()
    ) {
      updateExtract();
    } else if (
      statement["CREDITO"] === auxiliary["DEBITOS"] &&
      removeDays(statement["FECHA"], 1).getTime() ==
        new Date(auxiliary["FECHA"]).getTime()
    ) {
      updateExtract();
    }

    if (
      statement["CREDITO"] === auxiliary["DEBITOS"] &&
      new Date(statement["FECHA"]).getTime() ===
        addDays(auxiliary["FECHA"], 2).getTime()
    ) {
      updateExtract();
    } else if (
      statement["CREDITO"] === auxiliary["DEBITOS"] &&
      addDays(statement["FECHA"], 2).getTime() ==
        new Date(auxiliary["FECHA"]).getTime()
    ) {
      updateExtract();
    } else if (
      statement["CREDITO"] === auxiliary["DEBITOS"] &&
      new Date(statement["FECHA"]).getTime() ===
        removeDays(auxiliary["FECHA"], 2).getTime()
    ) {
      updateExtract();
    } else if (
      statement["CREDITO"] === auxiliary["DEBITOS"] &&
      removeDays(statement["FECHA"], 2).getTime() ==
        new Date(auxiliary["FECHA"]).getTime()
    ) {
      updateExtract();
    }
  };

  axios
    .get<GetSiigoAuxiliary>(
      `${apiUrl}/auxiliar/all/DEBITOS/?MES=${month}`,
      configAxios
    )
    .then((res) => {
      const auxiliaries: GetSiigoAuxiliary = res.data;
      statementsFilter.forEach((statement) => {
        auxiliaries.forEach((auxiliary) => update(statement, auxiliary));
      });
      return true;
    })
    .catch((err: any) => {
      console.log("debitos", err.message);
      return false;
    });
};

const handlerSetReconciliation: HandlerSetReconciliation = async (req, res) => {
  const { statement, month } = req.body;

  await setBankingCharges(statement, month);
  await setCards(statement, month);
  await setCredits(statement, month);
  debitos(statement, month);

  res.status(200).send(true);
};

export default handlerSetReconciliation;
