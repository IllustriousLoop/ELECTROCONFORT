import { CopyrightOutlined } from "@ant-design/icons";
import { Layout, Typography } from "antd";

const { Text, Link } = Typography;

const Footer = () => {
  return (
    <Layout.Footer style={{ textAlign: "center", maxHeight: "100px" }}>
      <Text>Conciliador </Text>
      <CopyrightOutlined />{" "}
      <Text>{"Electroconfort " + new Date().getFullYear() + " "}</Text>
      <br />
      <Text>Created by </Text>
      <Link href="https://jhairparis.com/">IllustriousLoop</Link>
    </Layout.Footer>
  );
};

export default Footer;
