import type { ColumnsType } from "antd/es/table";
import type { auxiliaryData } from "../../ts/interfaces/siigo/auxiliary.interfaces";
import dateFilter from "../filters/date";

const columnsAuxiliary: ColumnsType<auxiliaryData> = [
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
  { dataIndex: "DEBITOS", title: "Debitos" },
  { dataIndex: "CREDITOS", title: "Creditos" },
  { dataIndex: "FRANQUICIA", title: "Franquicia" },
  {
    dataIndex: "FECHA VAOUCHER",
    title: "Fecha Voucher",
    ...dateFilter("FECHA VAOUCHER"),
  },
  { dataIndex: "TERMINAL", title: "Terminal" },
];

// { dataIndex: "id", title: "ID" },
export default columnsAuxiliary;
