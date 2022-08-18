import { FC } from "react";
import CustomTable from "../table";
import { columnsStatement } from "../../utils";
import { Button, Alert, Row, Col } from "antd";
import { BankStatementData } from "../../ts/types/bank/getStatement.types";
import useFetchStatement from "../../hooks/useReconcilation";

interface Props {
  statement: BankStatementData;
}

const Statement: FC<Props> = ({ statement }) => {
  const reconciliation = useFetchStatement(statement);

  return (
    <>
      <Row>
        <Col span={8}>
          <Button type="primary" onClick={() => reconciliation()}>
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
