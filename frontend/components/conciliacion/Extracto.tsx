import axios from "axios";
import { useState, useEffect } from "react";
import { apiUrl, columnsExtracto, conciliacion } from "../../utils/apiContext";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Alert } from "@mui/material";

const Extracto = ({ extracto, month, apiUrl }) => {
  const [pageSize, setPageSize] = useState(200);

  return (
    <>
      <Box
        sx={{
          height: "8vh",
          width: "100%",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => conciliacion(apiUrl, extracto, month)}
        >
          Conciliar Extracto
        </Button>
        <Alert variant="outlined" severity="error">
          Debitos revision manual
        </Alert>
      </Box>
      <Box sx={{ height: "90vh", width: "100%" }}>
        <DataGridPro
          rows={extracto}
          columns={columnsExtracto}
          loading={extracto.length === 0}
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
    </>
  );
};

export default Extracto;
