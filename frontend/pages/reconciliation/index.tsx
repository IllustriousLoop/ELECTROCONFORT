import React from "react";
import { Button, TextField } from "@mui/material/";
import { useState } from "react";
import Link from "next/link";

const Reconciliation = () => {
  const [month, setMonth] = useState(1);

  return (
    <div>
      <TextField
        label="Numero de mes"
        variant="filled"
        type="number"
        value={month}
        onChange={(e: any) => setMonth(e.target.value)}
      />
      <Link href={`/reconciliation/statement&auxiliary/${month}`}>
        <Button variant="contained" color="primary">
          Extrcto y auxiliar
        </Button>
      </Link>
      <Link href={`/reconciliation/bankCards/${month}`}>
        <Button variant="contained" color="secondary">
          Tarjetas
        </Button>
      </Link>
    </div>
  );
};

export default Reconciliation;
