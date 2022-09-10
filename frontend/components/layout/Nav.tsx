import {
  HomeOutlined,
  FileTextOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { useRouter } from "next/router";
import auth from "../../hooks/context/auth";
import { Role } from "../../ts/types/auth/authData";
import { createElement, useContext } from "react";

type MenuItem = Required<MenuProps>["items"][number];
type MenuItems = MenuItem[];

const months = ["January", "February", "March", "April", "May"].map(
  (month, i) => {
    return {
      key: `month-${i}`,
      icon: createElement(CalendarOutlined),
      label: month,
    };
  }
);

const Nav = ({ collapsed }: { collapsed: boolean }) => {
  const router = useRouter();
  const [{ role }] = useContext(auth);
  
  const itemSignOut = {
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

  const items: MenuItems = [
    {
      key: "2",
      icon: createElement(ArrowLeftOutlined),
      label: "Return",
    },
    ...(role !== Role.NoRole ? [itemSignOut] : []),
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
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth="0"
      theme="light"
    >
      <div className="logo" />
      <Menu theme="light" mode="inline" onClick={onClick} items={items} />
    </Layout.Sider>
  );
};

export default Nav;
