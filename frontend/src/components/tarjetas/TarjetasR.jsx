import React from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { GridToolbar } from "@mui/x-data-grid";
import { columnsTarjetasR } from "../../utils";

const TarjetasR = (props) => {
  return (
    <DataGridPro
      rows={props.data}
      columns={columnsTarjetasR}
      loading={props.data.length === 0}
      components={{ Toolbar: GridToolbar }}
      rowHeight={28}
      onSelectionModelChange={(newSelectionModel) =>
        props.setSelectionModel(newSelectionModel)
      }
      selectionModel={props.selectionModel}
      disableMultipleSelection={true}
    />
  );
};

export default TarjetasR;
