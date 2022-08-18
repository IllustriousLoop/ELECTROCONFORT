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
import { toast } from "react-toastify";

interface Props {
  summaryCards: SummaryCardsData;
}

const ReconciliationByMonth: NextPage<Props> = ({ summaryCards }) => {
  const [selection, setSelection] = useState<AllCardsData>([]);
  const [auxiliary, setAuxiliary] = useState<AuxiliaryData>([]);
  const [password, setPassword] = useState<string>("");
  const [unlock, setUnlock] = useState(false);

  const router = useRouter();

  const onSelectChange = (i: React.Key[], selectedRow: AllCardsData) => {
    setSelection(selectedRow);
  };

  const rowSelection = {
    selectedRow: selection,
    onChange: onSelectChange,
  };

  useEffect(() => {
    if (selection.length > 0) {
      const item = selection[0]["Vlr Total"];
      axios
        .get<AuxiliaryData>(
          `http://192.168.0.8/api/siigo/auxiliary/?month=${router.query.month}`
        )
        .then(({ data }) => {
          const filterData = data.filter(
            (record) => record["DEBITOS"] === item
          );

          setAuxiliary(filterData);
        });
    } else setAuxiliary([]);
  }, [selection]);

  const columnsM = () => {
    const cols = [];
    columnsAuxiliary.map((item) => cols.push(item));
    cols.push({ dataIndex: "ASOCIADO", title: "ASOCIADO", editable: true });
    return cols;
  };

  const defaultColumns = columnsM();

  const handleSave = (row: auxiliaryData) => {
    const newData = [...auxiliary];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    const options = {
      method: "PUT",
      url: `http://192.168.0.8:5000/api/auxiliar/${row.key}`,
      data: { ASOCIADO: row.ASOCIADO },
    };
    const id = row.key;
    toast.info("Trayendo Asociados", {
      toastId: id,
      autoClose: false,
      closeButton: false,
    });

    const asyncUpdate = async () => {
      try {
        await axios.request(options);
        toast.update(id, {
          render: `Listo se Actualizo el Asociado`,
          type: "success",
          autoClose: 2000,
          closeButton: true,
        });
      } catch (error) {
        toast.update(id, {
          render: `No se actualizo el asociado se recomienda recargar la pagina`,
          type: "error",
          autoClose: 2000,
          closeButton: true,
        });
      }
    };
    asyncUpdate();

    setAuxiliary(newData);
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
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
    if (password === "JhairDev" && unlock === false) {
      setUnlock(true);
    } else {
      setUnlock(false);
    }
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
