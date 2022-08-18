import type { NextPage, GetServerSideProps } from "next";
import { CheckOutlined } from "@ant-design/icons";
import { SummaryCardsData } from "../../../ts/types/bank/getSummaryCards.types";
import axios from "axios";
import { useEffect, useState } from "react";
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

interface Props {
  summaryCards: SummaryCardsData;
}

const ReconciliationByMonth: NextPage<Props> = ({ summaryCards }) => {
  const [selectedRow, setSelectedRow] = useState<AllCardsData>([]);
  const [auxiliary, handleSave] = useFetchBySelection(selectedRow);
  const [password, setPassword] = useState<string>("");
  const [unlock, setUnlock] = useState(false);
  const router = useRouter();

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

  const handleUnlock = () => {
    if (password === "JhairDev" && unlock === false) setUnlock(true);
    else setUnlock(false);
  };

  return (
    <>
      <Space>
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="primary"
          shape="circle"
          icon={<CheckOutlined />}
          onClick={handleUnlock}
        />
      </Space>

      {unlock && (
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
      )}

      <Row>
        <Col span={24}>
          <SummaryCards
            summaryCards={summaryCards}
            subSelection={rowSelection}
          />
        </Col>
      </Row>
      {unlock && (
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
      )}
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
