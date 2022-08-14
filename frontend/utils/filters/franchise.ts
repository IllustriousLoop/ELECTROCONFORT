import { filter } from "../../ts/types/filters";

const franchiseFilter: filter = (dataIndex) => ({
  filters: [
    { text: "MasterCard/Maestro", value: "MNS" },
    { text: "DinerClub", value: "DCN" },
    { text: "Visa", value: "VNS" },
  ],
  onFilter: (value: any, record) => record[dataIndex].indexOf(value) === 0,
});

export default franchiseFilter;
