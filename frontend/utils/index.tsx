import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { allCardData } from "../ts/interfaces/bank/allCards.interfaces";
import { summaryCardData } from "../ts/interfaces/bank/summaryCards.interfaces";
import { auxiliaryData } from "../ts/interfaces/siigo/auxiliary.interfaces";
import { statementData } from "../ts/interfaces/bank/statement.interfaces";

export const dateNormalizer = (param: string, name: any) => {
  return param ? new Date(param).toLocaleDateString() : "";
};

export const columnsStatement: ColumnsType<statementData> = [
  // { dataIndex: "id", title: "ID" },
  {
    dataIndex: "FECHA",
    title: "Fecha",
    render: (text) => dateNormalizer(text, "FECHA"),
  },
  {
    dataIndex: "DESCRIPCION",
    title: "Descripcion",
  },
  { dataIndex: "TERMINAL", title: "Terminal" },
  { dataIndex: "DEBITO", title: "Debito" },
  { dataIndex: "CREDITO", title: "Credito" },
  {
    dataIndex: "TIPO",
    title: "Tipo",
    render: (_, { TIPO }) => {
      return (
        <>
          {TIPO.map((type) => {
            let color = "geekblue";
            if (type === "tarjeta") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={type}>
                {type.toUpperCase()}
              </Tag>
            );
          })}
        </>
      );
    },
  },
];

export const columnsAuxiliary: ColumnsType<auxiliaryData> = [
  // { dataIndex: "id", title: "ID" },
  {
    dataIndex: "COMPROBANTE",
    title: "Comprobante",
  },
  {
    dataIndex: "FECHA",
    title: "Fecha",
    render: (text) => dateNormalizer(text, "FECHA"),
  },
  {
    dataIndex: "DESCRIPCION",
    title: "Descripcion",
  },
  { dataIndex: "DEBITOS", title: "Debitos" },
  { dataIndex: "CREDITOS", title: "Creditos" },
  { dataIndex: "FRANQUICIA", title: "Franquicia" },
  {
    dataIndex: "FECHA VAOUCHER",
    title: "Fecha Voucher",
    render: (text) => dateNormalizer(text, "FECHA VAOUCHER"),
  },
  { dataIndex: "TERMINAL", title: "Terminal" },
];

export const columnsSummaryCards: ColumnsType<summaryCardData> = [
  // { dataIndex: "id", title: "ID"  },
  {
    dataIndex: "Codigo  establec",
    key: "Codigo  establec",
    title: "Terminal",
  },
  {
    dataIndex: "Franquicia",
    key: "Franquicia",
    title: "Franquicia",
  },
  /* {
    dataIndex: "Fecha de Abono",
    key: "Fecha de Abono",
    title: "Fecha de Abono",
    render: (text) => dateNormalizer(text, "Fecha de Abono"),
  }, 
   {
    dataIndex: "Fecha de proceso",
    key: "Fecha de proceso",
    title: "Fecha de proceso",
    render: (text) => dateNormalizer(text, "Fecha de proceso"),
  }, 
  {
    dataIndex: "Tipo Transaccion",
    key: "Tipo Transaccion",
    title: "Tipo Transaccion",
  },
  {
    dataIndex: "Vlr Compras",
    key: "Vlr Compras",
    title: "Vlr Compras",
  },
  {
    dataIndex: "Vlr Iva",
    key: "Vlr Iva",
    title: "Vlr Iva",
  },
  {
    dataIndex: "Vlr Propina",
    key: "Vlr Propina",
    title: "Vlr Propina",
  },*/
  {
    dataIndex: "Vlr Total",
    key: "Vlr Total",
    title: "Vlr Total",
  },
  /* {
    dataIndex: "Valor Comision",
    key: "Valor Comision",
    title: "Valor Comision",
  },
  {
    dataIndex: "Vlr Rete Iva",
    key: "Vlr Rete Iva",
    title: "Vlr Rete Iva",
  },
  {
    dataIndex: "Vlr Rete Ica",
    key: "Vlr Rete Ica",
    title: "Vlr Rete Ica",
  },
  {
    dataIndex: "Valor Rte Fte",
    key: "Valor Rte Fte",
    title: "Valor Rte Fte",
  }, */
  {
    dataIndex: "Valor Abono",
    key: "Valor Abono",
    title: "Valor Abono",
  },
  /*{
    dataIndex: "Cuenta",
    key: "Cuenta",
    title: "Cuenta",
  },
  {
    dataIndex: "asociado",
    title: "Asociados",
  }, */
];

export const columnsAllCards: ColumnsType<allCardData> = [
  // { dataIndex: "id", title: "ID" },
  { dataIndex: "Comercio", title: "Terminal" },
  { dataIndex: "Franquicia", title: "Franquicia" },
  /* {
    dataIndex: "F abono",
    title: "Fecha de Abono",
    render: (params) => dateNormalizer(params, "F abono"),
  },*/
  {
    dataIndex: "F vale",
    title: "Fecha de Vale",
    render: (params) => dateNormalizer(params, "F vale"),
  },
  /*{
    dataIndex: "F proceso",
    title: "Fecha de Proceso",
    render: (params) => dateNormalizer(params, "F proceso"),
  },
  {
    dataIndex: "Tarjeta",
    title: "Tarjeta",
  },
  {
    dataIndex: "Hora trans",
    title: "Hora trans",
  },
  {
    dataIndex: "Comprobante",
    title: "Comprobante",
  },
  { dataIndex: "Autorizacion", title: "Autorizacion" },
  {
    dataIndex: "Terminal",
    title: "Terminal Especi",
  },
  {
    dataIndex: "Vlr Compra",
    title: "Vlr Compra",
  },
  {
    dataIndex: "Vlr Iva",
    title: "Vlr Iva",
  },
  {
    dataIndex: "Vlr Propina",
    title: "Vlr Propina",
  }, */
  { dataIndex: "Vlr Total", title: "Vlr Total" },
  /* {
    dataIndex: "Vlr Comision",
    title: "Vlr Comision",
  },
  {
    dataIndex: "Vlr Rete Iva",
    title: "Vlr Rete Iva",
  },
  {
    dataIndex: "Vlr Rete Ica",
    title: "Vlr Rete Ica",
  },
  {
    dataIndex: "Vlr Rete Fuente",
    title: "Vlr Rete Fuente",
  }, */
  { dataIndex: "Vlr Abono", title: "Vlr Abono" },
  /* {
    dataIndex: "T Tarjeta",
    title: "T Tarjeta",
  },
  {
    dataIndex: "Cuenta",
    title: "Cuenta",
  },
  {
    dataIndex: "Tipo Transaccion",
    title: "Tipo Transaccion",
  }, */
];
