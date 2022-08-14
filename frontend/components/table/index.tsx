import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { FC } from "react";
import { AllCardsData } from "../../ts/types/bank/getAllCards";
import { BankStatementData } from "../../ts/types/bank/getStatement.types";
import { SummaryCardsData } from "../../ts/types/bank/getSummaryCards.types";
import { AuxiliaryData } from "../../ts/types/siigo/getAuxiliary.types";

interface Props {
  data: SummaryCardsData | AllCardsData | AuxiliaryData | BankStatementData;
  columns: ColumnsType<any>;
  selection?: {
    selectedRowKeys: React.Key[];
    onChange: (newSelectedRowKeys: React.Key[]) => void;
  };
}

const CustomTable = ({ data, columns, selection }: Props) => {
  return (
    <Table
      dataSource={data}
      columns={columns}
      rowSelection={
        selection && {
          type: "radio",
          ...selection,
        }
      }
    />
  );
};

export default CustomTable;
