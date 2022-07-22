import { Tabs, Box, TextField, Tab, Typography } from "@mui/material/";
import Conciliacion from "./components/Conciliacion";
import Tarjetas from "./components/Tarjetas";
import { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = useState(0);
  const [MES, setMES] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <TextField
        label="Numero de mes"
        variant="filled"
        type="number"
        value={MES}
        onChange={(e) => setMES(e.target.value)}
      />
      {MES > 0 && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Extracto y Auxiliar" {...a11yProps(0)} />
              <Tab label="Tarjetas" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Conciliacion MES={MES} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Tarjetas MES={MES} />
          </TabPanel>
        </>
      )}
    </>
  );
}

export default App;
