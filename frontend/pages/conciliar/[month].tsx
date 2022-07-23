import type { NextPage, GetServerSideProps } from "next";
import Conciliacion from "../../components/Conciliacion";
import Tarjetas from "../../components/Tarjetas";
import { Tabs, Box, Tab } from "@mui/material/";
import axios from "axios";
import { SyntheticEvent, useState } from "react";

const Conciliar: NextPage = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (e: SyntheticEvent, newValue: number) =>
    setValue(newValue);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label="Extracto y Auxiliar" />
          <Tab label="Tarjetas" />
        </Tabs>
      </Box>
      <div role="tabpanel" hidden={value !== 0}>
        {value === 0 && (
          <Box sx={{ p: 3 }}>
            <Conciliacion {...props} />
          </Box>
        )}
      </div>
      <div role="tabpanel" hidden={value !== 1}>
        {value == 1 && (
          <Box sx={{ p: 3 }}>
            <Tarjetas {...props} />
          </Box>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { month } = context.query;
  const apiUrl = process.env.BACKEND_URL;
  const auxiliar = await axios.get(`${apiUrl}/auxiliar/?MES=${month}`);
  const extracto = await axios.get(`${apiUrl}/extracto/?MES=${month}`);
  const tarjetasr = await axios.get(`${apiUrl}/tarjetasr/?MES=${month}`);

  return {
    props: {
      apiUrl,
      auxiliar: auxiliar.data,
      extracto: extracto.data,
      tarjetasr: tarjetasr.data,
      month,
    },
  };
};

export default Conciliar;
