import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { FC } from "react";
import { AllCardsData } from "../../ts/types/bank/getAllCards";
import { BankStatementData } from "../../ts/types/bank/getStatement.types";
import { SummaryCardsData } from "../../ts/types/bank/getSummaryCards.types";
import { AuxiliaryData } from "../../ts/types/siigo/getAuxiliary.types";
import AllCards from "../reconciliation/card/AllCards";

interface Props {
  data:
    | SummaryCardsData
    | AllCardsData
    | AuxiliaryData
    | BankStatementData
    | undefined;
  columns: ColumnsType<any>;
  loading: boolean;
}

const CustomTable = ({ data, columns, loading }: Props) => {
  return (
    <Table
      dataSource={data}
      columns={columns}
      expandable={{
        expandedRowRender: (record) => <AllCards id={record.id} />,
        rowExpandable: (record) => record["asociado"]?.length > 0,
      }}
      loading={loading}
    />
  );
};

export default CustomTable;
