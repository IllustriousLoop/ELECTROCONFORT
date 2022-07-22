import { useState } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { GridToolbar } from "@mui/x-data-grid";
import { columnsTarjetasCompleto } from "../../utils";
import { Grid, Typography, Box } from "@mui/material";

const Toolbar = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={2}>
        <Typography variant="h6" align="center">
          Tarjetas del auxiliar
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <GridToolbar />
      </Grid>
    </Grid>
  );
};
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function CustomFooterStatusComponent(props) {
  return (
    <Box sx={{ p: 1, display: "flex" }}>
      Total {numberWithCommas(props.sum)}
    </Box>
  );
}

const TarjetasCompleto = (props) => {
  const [selectionModel, setSelectionModel] = useState([]);

  return (
    <DataGridPro
      rows={props.data}
      columns={columnsTarjetasCompleto}
      density="compact"
      // loading={aux.length === 0}
      components={{ Toolbar: Toolbar, Footer: CustomFooterStatusComponent }}
      componentsProps={{
        footer: { sum: props.sum },
      }}
      rowHeight={28}
      onSelectionModelChange={(newSelectionModel) => {
        setSelectionModel(newSelectionModel);
      }}
      selectionModel={selectionModel}
      disableSelectionOnClick
    />
  );
};

export default TarjetasCompleto;
