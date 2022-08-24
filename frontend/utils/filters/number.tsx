import { Button, Space, Input } from "antd";
import { toast } from "react-toastify";
import { SearchOutlined } from "@ant-design/icons";
import { filter } from "../../ts/types/filters";
import numeral from "numeral";

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
      <Input
        onChange={(e) => {
          const { value } = e.target;
          if (value.length === 0) setSelectedKeys([]);
          else {
            const nValue = numeral(value).value();
            setSelectedKeys([nValue]);
          }
        }}
      />
    </Space>
    <Space>
      <Button
        type="primary"
        onClick={() => {
          if (selectedKeys.length === 0) confirm();
          else {
            if (!isNaN(selectedKeys[0])) confirm();
            else toast.error("Please select a number");
          }
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

const numberFilter: filter = (dataIndex) => ({
  filterDropdown: filterDropdownComponent,
  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  ),
  onFilter: (value, record) => record[dataIndex] === value,
});

export default numberFilter;
