import axios from "axios";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import GetAssociatedCards from "../../../ts/types/bank/getAssociatedCards";
import { columnsAllCards } from "../../../utils";
import CustomTable from "../../table";
import { toast } from "react-toastify";
import { Zoom, Flip } from "react-toastify";

interface Props {
  id: string;
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
      toast.info("Please wait...", {
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
          render: "All is good",
          type: "success",
          autoClose: 2000,
          closeButton: true,
          transition: Flip,
        });
      } catch (error) {
        toast.update(id, {
          render: "All is not well",
          type: "error",
          autoClose: 2000,
          closeButton: true,
          transition: Zoom,
        });
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return {
    data: data?.cards,
    loading,
  };
};

const AllCards: FC<Props> = ({ id }) => {
  const { data, loading } = useFetchData(id);
  return <CustomTable data={data} columns={columnsAllCards} loading={loading}/>;
};

export default AllCards;
