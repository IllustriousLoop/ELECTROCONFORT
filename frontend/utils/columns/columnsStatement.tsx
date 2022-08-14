import type { ColumnsType } from "antd/es/table";
import type { statementData } from "../../ts/interfaces/bank/statement.interfaces";
import { Tag } from "antd";
import { dateNormalizer } from "../functions";

const columnsStatement: ColumnsType<statementData> = [
  {
    dataIndex: "FECHA",
    title: "Fecha",
    render: (text) => dateNormalizer(text),
  },
  {
    dataIndex: "DESCRIPCION",
    title: "Descripcion",
  },
  { dataIndex: "TERMINAL", title: "Terminal" },
  { dataIndex: "DEBITO", title: "Debito" },
  { dataIndex: "CREDITO", title: "Credito" },
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
