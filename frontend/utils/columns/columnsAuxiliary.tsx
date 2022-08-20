import { Table } from "antd";
import dateFilter from "../filters/date";
import formatMoney from "../functions/formatMoney";

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const columnsAuxiliary: (ColumnTypes[number] & { editable?: boolean })[] = [
  {
    dataIndex: "COMPROBANTE",
    title: "Comprobante",
  },
  {
    dataIndex: "FECHA",
    title: "Fecha",
    ...dateFilter("FECHA"),
  },
  {
    dataIndex: "DESCRIPCION",
    title: "Descripcion",
  },
  {
    dataIndex: "DEBITOS",
    title: "Debitos",
    render: (text) => formatMoney(text),
  },
  {
    dataIndex: "CREDITOS",
    title: "Creditos",
    render: (text) => formatMoney(text),
  },
  { dataIndex: "FRANQUICIA", title: "Franquicia" },
  {
    dataIndex: "FECHA VAOUCHER",
    title: "Fecha Voucher",
    ...dateFilter("FECHA VAOUCHER"),
  },
  { dataIndex: "TERMINAL", title: "Terminal" },
  { dataIndex: "ASOCIADO", title: "ASOCIADO", editable: true },
];

// { dataIndex: "id", title: "ID" },
export default columnsAuxiliary;
