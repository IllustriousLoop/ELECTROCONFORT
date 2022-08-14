import type { ColumnsType } from "antd/es/table";
import type { allCardData } from "../../ts/interfaces/bank/allCards.interfaces";
import { dateNormalizer } from "../functions";

const columnsAllCards: ColumnsType<allCardData> = [
  { dataIndex: "Comercio", title: "Terminal" },
  { dataIndex: "Franquicia", title: "Franquicia" },
  {
    dataIndex: "F vale",
    title: "Fecha de Vale",
    render: (params) => dateNormalizer(params),
  },
  { dataIndex: "Vlr Total", title: "Vlr Total" },

  { dataIndex: "Vlr Abono", title: "Vlr Abono" },
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
