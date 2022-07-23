import React from "react";
import Auxiliar from "./conciliacion/Auxiliar";
import Extracto from "./conciliacion/Extracto";

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


const Conciliacion = (props) => {
  return (
    <>
      <Extracto MES={props.MES} {...props} />
      <Auxiliar MES={props.MES} {...props} />
    </>
  );
};

export default Conciliacion;
