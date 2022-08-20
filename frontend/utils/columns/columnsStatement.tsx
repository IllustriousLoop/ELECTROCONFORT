import type { ColumnsType } from "antd/es/table";
import type { statementData } from "../../ts/interfaces/bank/statement.interfaces";
import { Tag } from "antd";
import dateFilter from "../filters/date";
import terminalFilter from "../filters/terminal";
import formatMoney from "../functions/formatMoney";

const columnsStatement: ColumnsType<statementData> = [
  {
    dataIndex: "FECHA",
    title: "Fecha",
    ...dateFilter("FECHA"),
  },
  {
    dataIndex: "DESCRIPCION",
    title: "Descripcion",
  },
  { dataIndex: "TERMINAL", title: "Terminal", ...terminalFilter("TERMINAL") },
  {
    dataIndex: "DEBITO",
    title: "Debito",
    render: (text) => formatMoney(text),
  },
  {
    dataIndex: "CREDITO",
    title: "Credito",
    render: (text) => formatMoney(text),
  },
  {
    dataIndex: "TIPO",
    title: "Tipo",
    render: (_, { TIPO }) => {
      return (
        <>
          {TIPO.map((type) => {
            let color = "geekblue";
            if (type === "tarjeta") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={type}>
                {type.toUpperCase()}
              </Tag>
            );
          })}
        </>
      );
    },
  },
];

// { dataIndex: "id", title: "ID" },
export default columnsStatement;
