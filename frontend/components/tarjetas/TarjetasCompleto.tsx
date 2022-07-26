import { FC, useState } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { GridToolbar } from "@mui/x-data-grid";
import { columnsAllCards } from "../../utils/apiContext";
import { Grid, Typography, Box } from "@mui/material";
import GetAllCards from "../../ts/types/bank/getAllCards";

const customToolbar = () => {
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

function customFooter({ sum }: { sum: number }) {
  const numberWithCommas = (x: number) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Box sx={{ p: 1, display: "flex" }}>Total {numberWithCommas(sum)}</Box>
  );
}
interface Props {
  allCards: GetAllCards;
  sum: number;
}

const TarjetasCompleto: FC<Props> = ({ allCards, sum }) => {
  const [selectionModel, setSelectionModel] = useState([]);

  return (
    <DataGridPro
      rows={allCards}
      columns={columnsAllCards}
      density="compact"
      loading={allCards.length === 0}
      components={{ Toolbar: customToolbar, Footer: customFooter }}
      componentsProps={{
        footer: { sum },
      }}
      rowHeight={28}
      // onSelectionModelChange={(newSelectionModel) => {
      // setSelectionModel(newSelectionModel);
      // }}
      // selectionModel={selectionModel}
      disableSelectionOnClick
    />
  );
};

export default TarjetasCompleto;
