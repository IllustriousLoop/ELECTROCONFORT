import type { NextPage, GetServerSideProps } from "next";
import GetSummaryCards, {
  SummaryCardsData,
} from "../../../ts/types/bank/getSummaryCards.types";
import axios from "axios";
import { useEffect, useState } from "react";
import AllCards from "../../../components/card/AllCards";
import SummaryCards from "../../../components/card/SummaryCards";
import { Button, Col, Row, Switch } from "antd";

interface Props {
  summaryCards: SummaryCardsData;
  month: number;
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

const ReconciliationByMonth: NextPage<Props> = ({ summaryCards, month }) => {
  const [allCards, setAllCards] = useState([]);
  const [associated, setAssociated] = useState(true);
  const [view, setView] = useState(false);
  const [selection, setSelection] = useState<React.Key[]>([]);
  const [sum, setSum] = useState<number>(0);

  const handleChange = (checked: boolean) => setAssociated(checked);

  useEffect(() => {
    if (summaryCards[0]["asociado"]?.length === 0) {
      setView(false);
      setAssociated(false);
    } else setView(true);

    if (!associated) {
      axios
        .get(`/api/bank/allCards/?month=${month}`)
        .then((res) => {
          setAllCards(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else setAllCards([]);
  }, [associated]);

  useEffect(() => {
    if (selection.length > 0 && associated) {
      (async () => {
        const {
          data: { cards, sum },
        } = await axios.post(
          `/api/bank/associated`,
          JSON.stringify({
            id: selection[0],
            month: month,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setAllCards(cards);
        setSum(sum);
      })();
    }
  }, [selection]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", selection);
    setSelection(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: selection,
    onChange: onSelectChange,
  };

  return (
    <>
      <div style={{ height: "10vh", width: "100%" }}>
        {view ? (
          <Switch
            checked={associated}
            onChange={handleChange}
            checkedChildren="Asociando"
            unCheckedChildren="Revision"
          />
        ) : (
          <Button
            type="primary"
            onClick={() => findAssociateValues(summaryCards, month)}
          >
            Buscar Asociados
          </Button>
        )}
      </div>
      <Row>
        <Col span={24}>
          <SummaryCards summaryCards={summaryCards} selection={rowSelection} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <AllCards allCards={allCards} sum={sum} />
        </Col>
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
      month: Number(month),
    },
  };
};

export default ReconciliationByMonth;
