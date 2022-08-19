import type { NextPage, GetServerSideProps } from "next";
import { CheckOutlined } from "@ant-design/icons";
import { SummaryCardsData } from "../../../ts/types/bank/getSummaryCards.types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SummaryCards from "../../../components/reconciliation/card/SummaryCards";
import { Button, Col, Input, Row, Space } from "antd";
import { useRouter } from "next/router";
import Auxiliary from "../../../components/reconciliation/Auxiliary";
import { AuxiliaryData } from "../../../ts/types/siigo/getAuxiliary.types";
import { AllCardsData } from "../../../ts/types/bank/getAllCards";
import { auxiliaryData } from "../../../ts/interfaces/siigo/auxiliary.interfaces";
import { columnsAuxiliary } from "../../../utils";
import EditableCell from "../../../components/table/EditCell";
import findAssociateValues from "../../../utils/functions/findAssociatedValues";
import useFetchBySelection from "../../../hooks/requests/useFetchBySelection";
import auth from "../../../hooks/context/auth";
import { Role } from "../../../ts/types/auth/authData";

interface Props {
  summaryCards: SummaryCardsData;
}

const ReconciliationByMonth: NextPage<Props> = ({ summaryCards }) => {
  const [selectedRow, setSelectedRow] = useState<AllCardsData>([]);
  const [auxiliary, handleSave] = useFetchBySelection(selectedRow);
  const [{ isAuthenticated, role }] = useContext(auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push(`/auth/signIn?redirect=${router.asPath}`);
  }, [isAuthenticated]);

  const onChange = (i: React.Key[], selectedRow: AllCardsData) =>
    setSelectedRow(selectedRow);

  const rowSelection = {
    selectedRow,
    onChange,
  };

  const columns = columnsAuxiliary.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record: auxiliaryData) => ({
        record,
        editable: col.editable,
        handleSave,
      }),
    };
  });

  return (
    <>
      {role === Role.ADMIN ? (
        <div style={{ height: "10vh", width: "100%" }}>
          <Button
            type="primary"
            onClick={() =>
              findAssociateValues(summaryCards, Number(router.query.month))
            }
          >
            Buscar Asociados
          </Button>
        </div>
      ) : null}

      <Row>
        <Col span={24}>
          <SummaryCards
            summaryCards={summaryCards}
            subSelection={rowSelection}
          />
        </Col>
      </Row>
      {role === Role.ADMIN ? (
        <Row>
          <Col span={24}>
            <Auxiliary
              auxiliary={auxiliary}
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
      ) : null}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { month } = context.query;
  let summaryCards: SummaryCardsData = [];

  try {
    const res = await axios.get<SummaryCardsData>(
      `/api/bank/summaryCards/?month=${month}`
    );
    summaryCards = res.data;
  } catch (err: any) {
    console.log(err.message);
  }

  return {
    props: {
      summaryCards,
    },
  };
};

export default ReconciliationByMonth;
