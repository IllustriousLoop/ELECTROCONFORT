import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auxiliaryData } from "../../ts/interfaces/siigo/auxiliary.interfaces";
import { AllCardsData } from "../../ts/types/bank/getAllCards";
import { AuxiliaryData } from "../../ts/types/siigo/getAuxiliary.types";

type useFetchBySelectionType = (
  selection: AllCardsData
) => [AuxiliaryData, (row: auxiliaryData) => void];

const useFetchBySelection: useFetchBySelectionType = (
  selection: AllCardsData
) => {
  const [auxiliary, setAuxiliary] = useState<AuxiliaryData>([]);
  const {
    query: { month },
  } = useRouter();

  const asyncFetch = async () => {
    const { data } = await axios.get<AuxiliaryData>(
      `/api/siigo/auxiliary/?month=${month}`
    );

    const itemSelected = selection[0]["Vlr Total"];
    const filterData = data.filter(
      (record) => record["DEBITOS"] === itemSelected
    );

    setAuxiliary(filterData);
  };

  const asyncUpdate = async (associate: string[], id: string) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auxiliar/${id}`, {
        ASOCIADO: associate,
      });
      toast.update(id, {
        render: `Listo se Actualizo el Asociado`,
        type: "success",
        autoClose: 2000,
        closeButton: true,
      });
    } catch (error) {
      toast.update(id, {
        render: `No se actualizo el asociado se recomienda recargar la pagina`,
        type: "error",
        autoClose: 2000,
        closeButton: true,
      });
    }
  };

  useEffect(() => {
    if (selection.length > 0) asyncFetch();
    else setAuxiliary([]);
  }, [selection]);

  const handleSave = (row: auxiliaryData) => {
    const newData = [...auxiliary];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    const id = row.key;

    toast.info("Trayendo Asociados", {
      toastId: id,
      autoClose: false,
      closeButton: false,
    });

    asyncUpdate(row.ASOCIADO, id);

    setAuxiliary(newData);
  };

  return [auxiliary, handleSave];
};

export default useFetchBySelection;
