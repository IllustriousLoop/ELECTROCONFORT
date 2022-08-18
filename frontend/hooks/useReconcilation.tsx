import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { BankStatementData } from "../ts/types/bank/getStatement.types";

const useFetchStatement = (statement: BankStatementData) => {
  const {
    query: { month },
  } = useRouter();

  const asyncSetReconciliation = async () => {
    await axios.post(
      "/api/bank/set/reconciliation",
      JSON.stringify({ statement, month }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const reconciliation = () => {
    toast.promise(asyncSetReconciliation, {
      pending: "Se esta conciliando..",
      success: "Se concilio con exito",
      error: "No se pudo conciliar",
    });
  };

  return reconciliation;
};

export default useFetchStatement;
