import { ReactNode } from "react";

type MenuType = "ORIGIN" | "THIRD"; // 内部 ｜ 第三方

interface MenuItem {
  id: number;
  key: string;
  icon: String;
  label: string;
  link: string;
  type: MenuType;
  children?: MenuItem[];
}

const MOKE_MENU:MenuItem[] = [
    {
      id: -1,
      key: "/",
      label: "首页",
      icon: "icon-home",
      link: "/",
      type: "ORIGIN",
    },
    {
      id: 1,
      key: "/system",
      label: "系统管理",
      icon: "icon-home",
      link: "/system",
      type: "ORIGIN",
      children: [
        {
          id: 1001,
          key: "/system/admin",
          label: "管理员列表",
          icon: "icon-nickname",
          link: "/system/admin",
          type: "ORIGIN",
        },
        {
          id: 1002,
          key: "/system/role",
          label: "角色管理",
          icon: "icon-addresslist", //React.createElement(TeamOutlined,
          link: "/system/role",
          type: "ORIGIN",
        },
        {
          id: 1003,
          key: "/system/menus",
          label: "菜单管理",
          icon: "icon-addresslist", //React.createElement(TeamOutlined,
          link: "/system/menus",
          type: "ORIGIN",
        },
        {
          id: 1004,
          key: "/system/sql",
          label: "SQL监控",
          icon: "icon-addresslist", //React.createElement(TeamOutlined,
          link: "/system/sql",
          type: "ORIGIN",
        },
        {
          id: 1005,
          key: "/system/log",
          label: "系统日志",
          icon: "icon-addresslist", //React.createElement(TeamOutlined,
          link: "/system/log",
          type: "ORIGIN",
        },
      ],
    },
    {
      id: 2,
      key: "/authority",
      label: "权限管理",
      icon: "icon-home",
      link: "/authority",
      type: "ORIGIN",
      children: [
        {
          id: 2001,
          key: "/authority/user",
          label: "用户管理",
          icon: "icon-nickname",
          link: "/authority/user",
          type: "ORIGIN",
        },
        {
          id: 2002,
          key: "/authority/role",
          label: "角色管理",
          icon: "icon-addresslist", // React.createElement(TeamOutlined),
          link: "/authority/role",
          type: "ORIGIN",
        },
      ],
    },
];

export default MOKE_MENU;