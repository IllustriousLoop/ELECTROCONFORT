import type { ColumnsType } from "antd/es/table";
import type { allCardData } from "../../ts/interfaces/bank/allCards.interfaces";
import dateFilter from "../filters/date";
import franchiseFilter from "../filters/franchise";
import terminalFilter from "../filters/terminal";

const columnsAllCards: ColumnsType<allCardData> = [
  {
    dataIndex: "Comercio",
    title: "Terminal",
    ...terminalFilter("Comercio"),
  },
  {
    dataIndex: "Franquicia",
    title: "Franquicia",
    ...franchiseFilter("Franquicia"),
  },
  {
    dataIndex: "Vlr Total",
    title: "Vlr Total",
    sorter: (a, b) => a["Vlr Total"] - b["Vlr Total"],
  },
  {
    dataIndex: "F vale",
    title: "Fecha de Vale",
    ...dateFilter("F vale"),
  },
  {
    dataIndex: "Vlr Abono",
    title: "Vlr Abono",
    sorter: (a, b) => a["Vlr Abono"] - b["Vlr Abono"],
  },
];

/*
!Columns not used in the table
  { dataIndex: "id", title: "ID" },
  {
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
  },
  {
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
  },
  {
    dataIndex: "F proceso",
    title: "Fecha de Proceso",
    render: (params) => dateNormalizer(params),
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
  },
  {
    dataIndex: "F abono",
    title: "Fecha de Abono",
    render: (params) => dateNormalizer(params),
  },
*/

export default columnsAllCards;
