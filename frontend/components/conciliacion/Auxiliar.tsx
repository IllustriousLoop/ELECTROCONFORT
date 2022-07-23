import axios from "axios";
import { useState, useEffect } from "react";
import { columnsAuxiliar } from "../../utils/apiContext";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const Auxiliar = (props) => {
  const [pageSize, setPageSize] = useState(200);

  return (
    <Box sx={{ height: "90vh", width: "100%" }}>
      <DataGridPro
        rows={props.auxiliar}
        columns={columnsAuxiliar}
        loading={props.auxiliar.length === 0}
        components={{ Toolbar: GridToolbar }}
        rowHeight={28}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[100, 200, 500, 1000]}
        pagination
        // onSelectionModelChange={(newSelectionModel) =>
        // setSelectionModel(newSelectionModel)
        // }
        // selectionModel={props.selectionModel}
        checkboxSelection
      />
    </Box>
  );
};

export default Auxiliar;
