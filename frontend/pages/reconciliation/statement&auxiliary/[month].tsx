import type { NextPage, GetServerSideProps } from "next";
import axios from "axios";
import GetSiigoAuxiliary from "../../../ts/types/siigo/getAuxiliary.types";
import GetBankStatement from "../../../ts/types/bank/getStatement.types";
import Auxiliar from "../../../components/conciliacion/Auxiliar";
import Extracto from "../../../components/conciliacion/Extracto";

interface Props {
  auxiliary: GetSiigoAuxiliary;
  statement: GetBankStatement;
  month: number;
}

const ReconciliationByMonth: NextPage<Props> = (props) => {
  return (
    <>
      <Extracto {...props} />
      <Auxiliar {...props} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { month } = context.query;

  const statement = await axios.get<GetBankStatement>(
    "/api/bank/statement?month=" + month
  );
  const auxiliary = await axios.get<GetSiigoAuxiliary>(
    `/api/siigo/auxiliary/?month=${month}`
  );

  return {
    props: {
      auxiliary: auxiliary.data,
      statement: statement.data,
      month: Number(month),
    },
  };
};

export default ReconciliationByMonth;
