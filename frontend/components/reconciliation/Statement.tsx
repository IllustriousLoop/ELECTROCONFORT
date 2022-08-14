import { FC } from "react";
import axios from "axios";
import CustomTable from "../table";
import { columnsStatement } from "../../utils";
import { Button, Alert, Row, Col } from "antd";
import { BankStatementData } from "../../ts/types/bank/getStatement.types";

interface Props {
  statement: BankStatementData;
  month: number;
}

const Statement: FC<Props> = ({ statement, month }) => {
  const reconciliationData = async () => {
    const { data } = await axios.post(
      "/api/bank/set/reconciliation",
      JSON.stringify({ statement, month }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
  };

  return (
    <>
      <Row>
        <Col span={8}>
          <Button type="primary" onClick={() => reconciliationData()}>
            Conciliar Extracto
          </Button>
        </Col>
        <Col span={8} offset={8}>
          <Alert type="error" message="Debitos revision manual" />
        </Col>
      </Row>
      <CustomTable
        data={statement}
        columns={columnsStatement}
        loading={false}
      />
    </>
  );
};

export default Statement;
