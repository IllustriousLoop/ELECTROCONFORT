import moment from "moment";
import { DatePicker, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { filter } from "../../ts/types/filters";
import { toast } from "react-toastify";

type filterDropdownProps = {
  selectedKeys: any;
  setSelectedKeys: (selectedKeys: any) => void;
  confirm: () => void;
};

const filterDropdownComponent = ({
  selectedKeys,
  setSelectedKeys,
  confirm,
}: filterDropdownProps) => (
  <div style={{ padding: 8 }}>
    <Space>
      <DatePicker
        onChange={(value) => {
          if (value === null) setSelectedKeys([]);
          else {
            setSelectedKeys([value]);
          }
        }}
        allowClear={true}
      />
    </Space>
    <Space>
      <Button
        type="primary"
        onClick={() => {
          if (selectedKeys[0] !== null) confirm();
          else toast.error("Please select a date");
        }}
        icon={<SearchOutlined />}
        size="small"
        style={{ width: 90 }}
      >
        Search
      </Button>
    </Space>
  </div>
);

const dateFilter: filter = (dataIndex) => ({
  filterDropdown: filterDropdownComponent,
  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  ),
  onFilter: (value, record) =>
    moment(record[dataIndex].toString())?.format("DD-MM-YYYY") ===
    moment(value.toString()).format("DD-MM-YYYY"),
});

export default dateFilter;
