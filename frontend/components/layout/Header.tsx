import { Layout } from "antd";
import { MenuUnfoldOutlined, CloseOutlined } from "@ant-design/icons";
import { createElement, Dispatch, SetStateAction } from "react";

type Props = {
  state: [boolean, Dispatch<SetStateAction<boolean>>];
};

const Header = ({ state }: Props) => {
  const [collapsed, setCollapsed] = state;
  return (
    <Layout.Header
      style={{
        padding: 0,
        background: "#fff",
        height: "35px",
        lineHeight: "0px",
        fontSize: "30px",
      }}
    >
      {createElement(collapsed ? MenuUnfoldOutlined : CloseOutlined, {
        onClick: () => setCollapsed(!collapsed),
      })}
    </Layout.Header>
  );
};

export default Header;
