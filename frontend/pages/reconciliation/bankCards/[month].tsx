import type { NextPage, GetServerSideProps } from "next";
import GetSummaryCards from "../../../ts/types/bank/getSummaryCards.types";
import axios from "axios";
import { useEffect, useState } from "react";
import TarjetasCompleto from "../../../components/tarjetas/TarjetasCompleto";
import TarjetasR from "../../../components/tarjetas/TarjetasR";
import {
  Box,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";

interface Props {
  summaryCards: GetSummaryCards;
  month: number;
}

const findAssociateValues = async (
  summaryCards: GetSummaryCards,
  month: number
) => {
  const { data } = await axios.post(
    `/api/bank/set/associateValues`,
    JSON.stringify({ summaryCards, month }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (data) {
    console.log("Obteniendo valores asociados", data);
  }
};

const ReconciliationByMonth: NextPage<Props> = ({ summaryCards, month }) => {
  const [allCards, setAllCards] = useState([]);
  const [asociado, setAsociado] = useState(true);
  const [view, setView] = useState(false);
  const [selection, setSelection] = useState<any>([]);
  const [sum, setSum] = useState<number>(0);

  const handleChange = (event: any) => setAsociado(event.target.checked);

  useEffect(() => {
    if (summaryCards[0]["asociado"]?.length === 0) {
      setView(false);
      setAsociado(false);
    } else setView(true);

    if (!asociado) {
      axios
        .get(`/api/bank/allCards/?month=${month}`)
        .then((res) => {
          setAllCards(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else setAllCards([]);
  }, [asociado]);

  useEffect(() => {
    if (selection.length > 0 && asociado) {
      (async () => {
        const {
          data: { cards, sum },
        } = await axios.post(
          `/api/bank/associated`,
          JSON.stringify({
            id: selection[0],
            month: month,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setAllCards(cards);
        setSum(sum);
      })();
    }
  }, [selection]);

  return (
    <>
      <Box sx={{ height: "10vh", width: "100%" }}>
        {view ? (
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={asociado} onChange={handleChange} />}
              label="Modo de Asociacion"
            />
          </FormGroup>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => findAssociateValues(summaryCards, month)}
            >
              Buscar Asociados
            </Button>
          </>
        )}
      </Box>
      <Box sx={{ height: "48vh", width: "100%" }}>
        <TarjetasR
          summaryCards={summaryCards}
          selection={selection}
          setSelection={setSelection}
        />
      </Box>
      <Box sx={{ height: "50vh", width: "100%" }}>
        <TarjetasCompleto allCards={allCards} sum={sum} />
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { month } = context.query;
  let summaryCards: GetSummaryCards = [];

  try {
    const res = await axios.get<GetSummaryCards>(
      `/api/bank/summaryCards/?month=${month}`
    );
    summaryCards = res.data;
  } catch (err: any) {
    console.log(err.message);
  }

  return {
    props: {
      summaryCards,
      month: Number(month),
    },
  };
};

export default ReconciliationByMonth;
