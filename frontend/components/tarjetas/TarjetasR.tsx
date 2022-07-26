import React, { FC } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { GridToolbar } from "@mui/x-data-grid";
import { columnsSummaryCards } from "../../utils/apiContext";
import GetSummaryCards from "../../ts/types/bank/getSummaryCards.types";

interface Props {
  summaryCards: GetSummaryCards;
  selection: [];
  setSelection: React.Dispatch<React.SetStateAction<[]>>;
}

const TarjetasR: FC<Props> = ({ summaryCards, ...props }) => {
  return (
    <DataGridPro
      rows={summaryCards}
      columns={columnsSummaryCards}
      loading={summaryCards.length === 0}
      components={{ Toolbar: GridToolbar }}
      rowHeight={28}
      onSelectionModelChange={(newSelection: any) =>
        props.setSelection(newSelection)
      }
      selectionModel={props.selection}
      disableMultipleSelection={true}
    />
  );
};

export default TarjetasR;
