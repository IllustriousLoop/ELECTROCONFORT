import Head from "next/head";
import {
  HomeOutlined,
  FileTextOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { createElement, useContext, useState } from "react";
import { useRouter } from "next/router";
import auth from "../../hooks/context/auth";
import { Role } from "../../ts/types/auth/authData";
import { Header } from "antd/lib/layout/layout";

const { Content, Footer, Sider } = Layout;

type Props = {
  children: JSX.Element[] | JSX.Element;
};
type MenuItem = Required<MenuProps>["items"][number];

const months = ["January", "February", "March", "April", "May"].map(
  (month, i) => {
    return {
      key: `month-${i}`,
      icon: createElement(CalendarOutlined),
      label: month,
    };
  }
);

const Main = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();
  const [{ role }] = useContext(auth);

  const userM = {
    key: "4",
    icon: createElement(UserOutlined),
    label: `User (${role})`,
    children: [
      {
        key: "4-1",
        label: "Sign out",
      },
    ],
  };

  const items: MenuItem[] = [
    {
      key: "2",
      icon: createElement(ArrowLeftOutlined),
      label: "Return",
    },
    ...(role !== Role.NoRole ? [userM] : []),
    {
      key: "1",
      icon: createElement(HomeOutlined),
      label: "Home",
    },
    {
      key: "3",
      icon: createElement(FileTextOutlined),
      label: "Reconciliation",
      children:
        router.pathname === "/reconciliation/statement&auxiliary/[month]" ||
        router.pathname === "/reconciliation/bankCards/[month]"
          ? months
          : undefined,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "2":
        router.back();
        break;
      case "1":
        router.push("/");
        break;
      case "3":
        if (
          !(
            router.pathname === "/reconciliation/statement&auxiliary/[month]" ||
            router.pathname === "/reconciliation/bankCards/[month]"
          )
        ) {
          router.push("/reconciliation");
        }
        break;
      case "4-1":
        router.push("/auth/signOut");
      default:
        if (e.key.includes("month"))
          router.push((parseInt(e.key.split("-")[1]) + 1).toString());
        break;
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Electroconfort</title>
      </Head>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth="0"
          theme="light"
        >
          <div className="logo" />
          <Menu theme="light" mode="inline" onClick={onClick} items={items} />
        </Sider>
        <Layout>
          <Header
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
          </Header>
          <Content>
            <div>{children}</div>
          </Content>
          <Footer style={{ textAlign: "center", maxHeight: "100px" }}>
            Conciliador ©2022 Created by IllustriousLoop
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Main;
