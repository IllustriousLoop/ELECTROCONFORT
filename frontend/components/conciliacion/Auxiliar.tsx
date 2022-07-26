import { FC, useState } from "react";
import { columnsAuxiliary } from "../../utils/apiContext";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import GetSiigoAuxiliary from "../../ts/types/siigo/getAuxiliary.types";

interface Props {
  auxiliary: GetSiigoAuxiliary;
}

const Auxiliar: FC<Props> = ({ auxiliary }) => {
  const [pageSize, setPageSize] = useState(200);

  return (
    <Box sx={{ height: "90vh", width: "100%" }}>
      <DataGridPro
        rows={auxiliary}
        columns={columnsAuxiliary}
        loading={auxiliary.length === 0}
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
