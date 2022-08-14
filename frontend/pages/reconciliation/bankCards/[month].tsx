import type { NextPage, GetServerSideProps } from "next";
import GetSummaryCards, {
  SummaryCardsData,
} from "../../../ts/types/bank/getSummaryCards.types";
import axios from "axios";
import { useEffect, useState } from "react";
import SummaryCards from "../../../components/reconciliation/card/SummaryCards";
import { Button, Col, Row } from "antd";
import { useRouter } from "next/router";

interface Props {
  summaryCards: SummaryCardsData;
}

const findAssociateValues = async (
  summaryCards: GetSummaryCards,
  month: number
) => {
  const { data } = await axios.post(
    `/api/bank/set/associateValues`,
    JSON.stringify({ summaryCards, month }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (data) {
    console.log("Obteniendo valores asociados", data);
  }
};

const ReconciliationByMonth: NextPage<Props> = ({ summaryCards }) => {
  const [view, setView] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (summaryCards[0]["asociado"].length === 0) setView(false);
    else setView(true);
  }, [summaryCards]);

  return (
    <>
      {view ? null : (
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
          <SummaryCards summaryCards={summaryCards} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>{/**/}</Col>
      </Row>
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
