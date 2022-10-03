import type { NextPage, GetServerSideProps } from "next";
import axios from "axios";
import { AuxiliaryData } from "../../../ts/types/siigo/getAuxiliary.types";
import { BankStatementData } from "../../../ts/types/bank/getStatement.types";
import Auxiliary from "../../../components/reconciliation/Auxiliary";
import Statement from "../../../components/reconciliation/Statement";
import { Col, Row } from "antd";
import auth from "../../../hooks/context/auth";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import CustomHead from "../../../components/layout/CustomHead";
import EditableCell from "../../../components/table/EditCell";
import { columnsAuxiliary } from "../../../utils";
import { auxiliaryData } from "../../../ts/interfaces/siigo/auxiliary.interfaces";

interface Props {
  auxiliary: AuxiliaryData;
  statement: BankStatementData;
}

const ReconciliationByMonth: NextPage<Props> = (props) => {
  const [{ isAuthenticated }] = useContext(auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push(`/auth/signIn?redirect=${router.asPath}`);
  }, [isAuthenticated]);

  const columns = columnsAuxiliary.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record: auxiliaryData) => ({
        record,
        editable: col.editable,
        handleSave: () => {},
      }),
    };
  });

  return (
    <>
      <CustomHead title="Extracto y Auxiliar" />
      <Row>
        <Col span={24}>
          <Statement {...props} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Auxiliary
            {...props}
            addition={{
              columns,
              rowClassName: () => "editable-row",
              components: {
                body: {
                  cell: EditableCell,
                },
              },
            }}
          />
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
