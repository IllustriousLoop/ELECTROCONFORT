import type { ColumnsType } from "antd/es/table";
import { summaryCardData } from "../../ts/interfaces/bank/summaryCards.interfaces";
import franchiseFilter from "../filters/franchise";
import terminalFilter from "../filters/terminal";
import numberFilter from "../filters/number";
import formatMoney from "../functions/formatMoney";

const columnsSummaryCards: ColumnsType<summaryCardData> = [
  {
    dataIndex: "Codigo  establec",
    key: "Codigo  establec",
    title: "Terminal",
    width: "20%",
    ...terminalFilter("Codigo  establec"),
  },
  {
    dataIndex: "Franquicia",
    key: "Franquicia",
    title: "Franquicia",
    width: "20%",
    ...franchiseFilter("Franquicia"),
  },
  {
    dataIndex: "Vlr Total",
    key: "Vlr Total",
    title: "Vlr Total",
    width: "30%",
    render: (text) => formatMoney(text),
    ...numberFilter("Vlr Total"),
    sorter: (a, b) => a["Valor Abono"] - b["Valor Abono"],
  },
  {
    dataIndex: "Valor Abono",
    key: "Valor Abono",
    title: "Valor Abono",
    width: "30%",
    render: (text) => formatMoney(text),
    ...numberFilter("Valor Abono"),
    sorter: (a, b) => a["Valor Abono"] - b["Valor Abono"],
  },
];

/*
!Columns not used in the table
  { dataIndex: "id", title: "ID" },
  {
    dataIndex: "Fecha de Abono",
    key: "Fecha de Abono",
    title: "Fecha de Abono",
    render: (text) => dateNormalizer(text),
  },
  {
    dataIndex: "Fecha de proceso",
    key: "Fecha de proceso",
    title: "Fecha de proceso",
    render: (text) => dateNormalizer(text),
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
  },
  {
    dataIndex: "Cuenta",
    key: "Cuenta",
    title: "Cuenta",
  },
  {
    dataIndex: "asociado",
    title: "Asociados",
  },
  {
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
  },
*/

export default columnsSummaryCards;
