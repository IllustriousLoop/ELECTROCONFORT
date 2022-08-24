import type { ColumnsType } from "antd/es/table";
import type { statementData } from "../../ts/interfaces/bank/statement.interfaces";
import { Tag } from "antd";
import dateFilter from "../filters/date";
import terminalFilter from "../filters/terminal";
import numberFilter from "../filters/number";
import formatMoney from "../functions/formatMoney";

const columnsStatement: ColumnsType<statementData> = [
  {
    dataIndex: "FECHA",
    title: "Fecha",
    width: "16%",
    ...dateFilter("FECHA"),
  },
  {
    dataIndex: "DESCRIPCION",
    width: "16%",
    title: "Descripcion",
  },
  {
    dataIndex: "TERMINAL",
    title: "Terminal",
    width: "16%",
    ...terminalFilter("TERMINAL"),
  },
  {
    dataIndex: "DEBITO",
    title: "Debito",
    width: "16%",
    ...numberFilter("DEBITO"),
    render: (text) => formatMoney(text),
  },
  {
    dataIndex: "CREDITO",
    title: "Credito",
    width: "16%",
    ...numberFilter("CREDITO"),
    render: (text) => formatMoney(text),
  },
  {
    dataIndex: "TIPO",
    title: "Tipo",
    width: "20%",
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
