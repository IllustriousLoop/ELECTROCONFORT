import { Layout } from "antd";
import { useState } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import Header from "./Header";
import CustomHead from "./CustomHead";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

const Main = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <>
      <CustomHead />
      <Layout style={{ minHeight: "100vh" }}>
        <Nav collapsed={collapsed} />
        <Layout>
          <Header state={[collapsed, setCollapsed]} />
          <Layout.Content>
            <div>{children}</div>
          </Layout.Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
};

export default Main;
