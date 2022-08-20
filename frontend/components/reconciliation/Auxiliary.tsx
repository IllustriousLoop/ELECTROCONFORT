import { FC } from "react";
import { auxiliaryData } from "../../ts/interfaces/siigo/auxiliary.interfaces";
import { AuxiliaryData } from "../../ts/types/siigo/getAuxiliary.types";
import { columnsAuxiliary } from "../../utils";
import CustomTable from "../table";

interface EditableCellProps {
  editable: boolean;
  children: React.ReactNode;
  record: auxiliaryData;
  handleSave: (record: auxiliaryData) => void;
}

type components = {
  body: {
    cell: FC<EditableCellProps>;
  };
};

interface Props {
  auxiliary: AuxiliaryData;
  addition?: {
    components: components;
    rowClassName: () => string;
    columns: {};
  };
}

const Auxiliary: FC<Props> = ({ auxiliary, addition }) => {
  return (
    <CustomTable
      data={auxiliary}
      columns={columnsAuxiliary}
      {...addition}
      loading={false}
      customX={2500}
    />
  );
};

export default Auxiliary;
