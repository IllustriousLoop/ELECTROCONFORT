import React from "react";
import { Button, Input } from "antd";
import { useState } from "react";
import Link from "next/link";

const Reconciliation = () => {
  const [month, setMonth] = useState(1);

  return (
    <div>
      <Input.Group compact>
        <Input
          style={{ width: "calc(100% - 400px)" }}
          placeholder="Numero de mes"
        type="number"
        value={month}
        onChange={(e: any) => setMonth(e.target.value)}
      />
      <Link href={`/reconciliation/statement&auxiliary/${month}`}>
          <Button type="primary">Extrcto y auxiliar</Button>
      </Link>
      <Link href={`/reconciliation/bankCards/${month}`}>
          <Button type="primary">Tarjetas</Button>
      </Link>
      </Input.Group>
    </div>
  );
};

export default Reconciliation;
