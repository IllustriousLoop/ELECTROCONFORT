import { Table } from "antd";
import dateFilter from "../filters/date";
import formatMoney from "../functions/formatMoney";

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const columnsAuxiliary: (ColumnTypes[number] & { editable?: boolean })[] = [
  {
    dataIndex: "COMPROBANTE",
    title: "Comprobante",
    width: "11%",
  },
  {
    dataIndex: "FECHA",
    title: "Fecha",
    width: "11%",
    ...dateFilter("FECHA"),
  },
  {
    dataIndex: "DESCRIPCION",
    title: "Descripcion",
    width: "12%",
  },
  {
    dataIndex: "DEBITOS",
    title: "Debitos",
    width: "11%",
    render: (text) => formatMoney(text),
  },
  {
    dataIndex: "CREDITOS",
    title: "Creditos",
    width: "11%",
    render: (text) => formatMoney(text),
  },
  { dataIndex: "FRANQUICIA", title: "Franquicia", width: "9%" },
  {
    dataIndex: "FECHA VAOUCHER",
    title: "Fecha Voucher",
    width: "11%",
    ...dateFilter("FECHA VAOUCHER"),
  },
  {
    dataIndex: "TERMINAL",
    title: "Terminal",
    width: "8%",
  },
  {
    dataIndex: "ASOCIADO",
    title: "ASOCIADO",
    editable: true,
    width: "16%",
  },
];

// { dataIndex: "id", title: "ID" },
export default columnsAuxiliary;
