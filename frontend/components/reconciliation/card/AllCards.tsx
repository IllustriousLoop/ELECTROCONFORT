import axios from "axios";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import GetAssociatedCards from "../../../ts/types/bank/getAssociatedCards";
import { columnsAllCards } from "../../../utils";
import CustomTable from "../../table";
import { toast } from "react-toastify";
import { Zoom, Flip } from "react-toastify";
import { AllCardsData } from "../../../ts/types/bank/getAllCards";

interface Props {
  id: string;
  selection?: {
    selectedRow: AllCardsData;
    onChange: (i: React.Key[], selectedRow: AllCardsData) => void;
  };
}

const useFetchData = (id: string) => {
  const [data, setData] = useState<GetAssociatedCards>();
  const [loading, setLoading] = useState(true);
  const {
    query: { month },
  } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      toast.info("Trayendo Asociados", {
        toastId: id,
        autoClose: false,
        closeButton: false,
      });
      try {
        const { data: response } = await axios.post<GetAssociatedCards>(
          `/api/bank/associated`,
          JSON.stringify({
            id: id,
            month: month,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setData(response);
        toast.update(id, {
          render: `Listo se encontraron ${response.cards.length} Asociados`,
          type: "success",
          autoClose: 2000,
          closeButton: true,
          transition: Flip,
        });
      } catch (error) {
        toast.update(id, {
          render: "Ups, no se pudo obtener los asociados",
          type: "error",
          autoClose: 2000,
          closeButton: true,
          transition: Zoom,
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [id, month]);

  return {
    data: data?.cards,
    loading,
  };
};

const AllCards: FC<Props> = ({ id, selection }) => {
  const { data, loading } = useFetchData(id);
  return (
    <CustomTable
      data={data}
      columns={columnsAllCards}
      loading={loading}
      selection={selection}
    />
  );
};

export default AllCards;
