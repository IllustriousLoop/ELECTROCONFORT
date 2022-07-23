import axios from "axios";
import { useEffect, useState } from "react";
import TarjetasCompleto from "./tarjetas/TarjetasCompleto";
import TarjetasR from "./tarjetas/TarjetasR";
import { findAsociados } from "../utils/apiContext";

import {
  Box,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";

function Tarjetas({ tarjetasr, apiUrl, month }) {
  const [aux, setAux] = useState([]);
  const [asociado, setAsociado] = useState(true);
  const [view, setView] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const [sum, setSum] = useState([]);

  //!todo: filtar desde el backend
  const handleChange = (event) => {
    setAsociado(event.target.checked);
  };

  useEffect(() => {
    if (tarjetasr[0]["asociado"].length === 0) {
      setView(false);
      setAsociado(false);
    } else {
      setView(true);
    }
    if (!asociado) {
      axios
        .get(`${apiUrl}/tarjetascompleto/?MES=${month}`)
        .then((res) => {
          setAux(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAux([]);
    }
  }, [asociado]);

  useEffect(() => {
    if (selectionModel.length > 0 && asociado) {
      axios
        .get(`${apiUrl}/tarjetasr/${selectionModel[0]}/?MES=${month}`)
        .then((res) => {
          axios
            .post(
              `${apiUrl}/tarjetascompleto/ids/?MES=${month}`,
              JSON.stringify(res.data["asociado"]),
              {
                headers: { "Content-Type": "application/json" },
              }
            )
            .then((res) => {
              let s = 0;
              res.data.forEach((e) => {
                s += e["Vlr Abono"];
              });
              setSum(s);
              setAux(res.data);
            });
        });
    }
  }, [selectionModel]);

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
              onClick={() => findAsociados(apiUrl, tarjetasr, month)}
            >
              Buscar Asociados
            </Button>
          </>
        )}
      </Box>
      <Box sx={{ height: "48vh", width: "100%" }}>
        <TarjetasR
          data={tarjetasr}
          selectionModel={selectionModel}
          setSelectionModel={setSelectionModel}
        />
      </Box>
      <Box sx={{ height: "50vh", width: "100%" }}>
        <TarjetasCompleto data={aux} sum={sum} />
      </Box>
    </>
  );
}

export default Tarjetas;
