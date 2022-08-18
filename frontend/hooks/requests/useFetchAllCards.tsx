import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Flip, toast, Zoom } from "react-toastify";
import GetAssociatedCards from "../../ts/types/bank/getAssociatedCards";

const useFetchAllCards = (id: string) => {
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

export default useFetchAllCards;
