import axios from "axios";
import { useState, useEffect } from "react";
import { apiUrl, columnsExtracto, conciliacion } from "../../utils";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Alert } from "@mui/material";

const Extracto = (props) => {
  const [extracto, setExtracto] = useState([]);
  const [pageSize, setPageSize] = useState(200);

  useEffect(() => {
    axios
      .get(`${apiUrl}/extracto/?MES=${props.MES}`)
      .then((res) => {
        setExtracto(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          onClick={() => conciliacion(extracto, props.MES)}
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
