import { filter } from "../../ts/types/filters";

const terminalFilter: filter = (dataIndex) => ({
  filters: [
    { text: "09", value: 15969009 },
    { text: "17", value: 15969017 },
    { text: "66", value: 15969066 },
    { text: "82", value: 15969082 },
    { text: "90", value: 15969090 },
  ],
  onFilter: (value, record) => record[dataIndex] === value,
});

export default terminalFilter;
