import React from "react";
import Auxiliar from "./conciliacion/Auxiliar";
import Extracto from "./conciliacion/Extracto";

const Conciliacion = (props) => {
  return (
    <>
      <Extracto MES={props.MES}/>
      <Auxiliar MES={props.MES}/>
    </>
  );
};

export default Conciliacion;
