import type { ColumnsType } from "antd/es/table";
import type { auxiliaryData } from "../../ts/interfaces/siigo/auxiliary.interfaces";
import { dateNormalizer } from "../functions";

const columnsAuxiliary: ColumnsType<auxiliaryData> = [
  {
    dataIndex: "COMPROBANTE",
    title: "Comprobante",
  },
  {
    dataIndex: "FECHA",
    title: "Fecha",
    render: (text) => dateNormalizer(text),
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
    render: (text) => dateNormalizer(text),
  },
  { dataIndex: "TERMINAL", title: "Terminal" },
];

// { dataIndex: "id", title: "ID" },
export default columnsAuxiliary;
