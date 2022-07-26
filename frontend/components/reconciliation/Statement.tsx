import { FC, useState } from "react";
import { columnsStatement } from "../../utils/apiContext";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Alert } from "@mui/material";
import axios from "axios";
import GetBankStatement from "../../ts/types/bank/getStatement.types";

interface Props {
  statement: GetBankStatement;
  month: number;
}

const Extracto: FC<Props> = ({ statement, month }) => {
  const [pageSize, setPageSize] = useState(200);

  const reconciliationData = async () => {
    const { data } = await axios.post(
      "/api/bank/set/reconciliation",
      JSON.stringify({ statement, month }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
  };

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
          onClick={() => reconciliationData()}
        >
          Conciliar Extracto
        </Button>
        <Alert variant="outlined" severity="error">
          Debitos revision manual
        </Alert>
      </Box>
      <Box sx={{ height: "90vh", width: "100%" }}>
        <DataGridPro
          rows={statement}
          columns={columnsStatement}
          loading={statement.length === 0}
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
