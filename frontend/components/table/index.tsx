import { Table } from "antd";
import { FC } from "react";
import { AllCardsData } from "../../ts/types/bank/getAllCards";
import { BankStatementData } from "../../ts/types/bank/getStatement.types";
import { SummaryCardsData } from "../../ts/types/bank/getSummaryCards.types";
import { AuxiliaryData } from "../../ts/types/siigo/getAuxiliary.types";
import AllCards from "../reconciliation/card/AllCards";

//!TODO: fix types

type data =
  | SummaryCardsData
  | AllCardsData
  | AuxiliaryData
  | BankStatementData
  | undefined;

interface Props {
  data: any;
  columns: any;
  components?: any;
  rowClassName?: () => string;
  loading: boolean;
  subSelection?: {
    selectedRow: AllCardsData;
    onChange: (i: React.Key[], selectedRow: AllCardsData) => void;
  };
  selection?: {
    selectedRow: AllCardsData;
    onChange: (i: React.Key[], selectedRow: AllCardsData) => void;
  };
}

const CustomTable = ({
  data,
  columns,
  components,
  rowClassName,
  loading,
  subSelection,
  selection,
}: Props) => {
  return (
    <Table
      dataSource={data}
      columns={columns}
      rowClassName={rowClassName}
      components={components}
      expandable={{
        expandedRowRender: (record) => {
          return <AllCards id={record.id} selection={subSelection} />;
        },
        rowExpandable: (record: any) => record["asociado"]?.length > 0,
      }}
      loading={loading}
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
