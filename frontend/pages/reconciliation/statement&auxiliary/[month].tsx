import type { NextPage, GetServerSideProps } from "next";
import axios from "axios";
import { AuxiliaryData } from "../../../ts/types/siigo/getAuxiliary.types";
import { BankStatementData } from "../../../ts/types/bank/getStatement.types";
import Auxiliary from "../../../components/reconciliation/Auxiliary";
import Statement from "../../../components/reconciliation/Statement";
import { Col, Row } from "antd";

interface Props {
  auxiliary: AuxiliaryData;
  statement: BankStatementData;
}

const ReconciliationByMonth: NextPage<Props> = (props) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Statement {...props} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Auxiliary {...props} />
        </Col>
      </Row>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { month } = context.query;

  const statement = await axios.get<BankStatementData>(
    `/api/bank/statement?month=${month}`
  );
  const auxiliary = await axios.get<AuxiliaryData>(
    `/api/siigo/auxiliary/?month=${month}`
  );

  return {
    props: {
      auxiliary: auxiliary.data,
      statement: statement.data,
    },
  };
};

export default ReconciliationByMonth;
