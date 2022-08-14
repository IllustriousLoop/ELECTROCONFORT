import { FC } from "react";
import { columnsAuxiliary } from "../../utils/";
import { AuxiliaryData } from "../../ts/types/siigo/getAuxiliary.types";
import CustomTable from "../table";

interface Props {
  auxiliary: AuxiliaryData;
}

const Auxiliary: FC<Props> = ({ auxiliary }) => {
  return <CustomTable data={auxiliary} columns={columnsAuxiliary} />;
};

export default Auxiliary;
