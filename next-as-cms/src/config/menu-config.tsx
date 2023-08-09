import { ReactNode } from "react";
import { createFromIconfontCN } from "@ant-design/icons/lib";

type MenuType = "ORIGIN" | "THIRD"; // 内部 ｜ 第三方

interface MenuItem {
  id: number;
  key: string;
  icon: ReactNode;
  label: string;
  link: string;
  type: MenuType;
  children?: MenuItem[];
}

const IconFont = createFromIconfontCN({
  scriptUrl: "/font/iconfont.js",
});

const getIcon = (iconName: string): ReactNode => {
  if (!iconName.startsWith("icon-")) {
    iconName = "icon-" + iconName;
  }
  return <IconFont type={iconName} style={{ fontSize: 20 }} />;
};

const MOKE_MENU: MenuItem[] = [
  {
    id: -1,
    key: "/",
    label: "首页",
    icon: getIcon("icon-home"),
    link: "/",
    type: "ORIGIN",
  },
  {
    id: 1,
    key: "/system",
    label: "系统管理",
    icon: getIcon("icon-home"),
    link: "/system",
    type: "ORIGIN",
    children: [
      {
        id: 1001,
        key: "/system/admin",
        label: "管理员列表",
        icon: getIcon("icon-nickname"),
        link: "/system/admin",
        type: "ORIGIN",
      },
      {
        id: 1002,
        key: "/system/role",
        label: "角色管理",
        icon: getIcon("icon-addresslist"), //React.createElement(TeamOutlined),
        link: "/system/role",
        type: "ORIGIN",
      },
      {
        id: 1003,
        key: "/system/menus",
        label: "菜单管理",
        icon: getIcon("icon-addresslist"), //React.createElement(TeamOutlined),
        link: "/system/menus",
        type: "ORIGIN",
      },
      {
        id: 1004,
        key: "/system/sql",
        label: "SQL监控",
        icon: getIcon("icon-addresslist"), //React.createElement(TeamOutlined),
        link: "/system/sql",
        type: "ORIGIN",
      },
      {
        id: 1005,
        key: "/system/log",
        label: "系统日志",
        icon: getIcon("icon-addresslist"), //React.createElement(TeamOutlined),
        link: "/system/log",
        type: "ORIGIN",
      },
    ],
  },
  {
    id: 2,
    key: "/authority",
    label: "权限管理",
    icon: getIcon("icon-home"),
    link: "/authority",
    type: "ORIGIN",
    children: [
      {
        id: 2001,
        key: "/authority/user",
        label: "用户管理",
        icon: getIcon("icon-nickname"),
        link: "/authority/user",
        type: "ORIGIN",
      },
      {
        id: 2002,
        key: "/authority/role",
        label: "角色管理",
        icon: getIcon("icon-addresslist"), //React.createElement(TeamOutlined),
        link: "/authority/role",
        type: "ORIGIN",
      },
    ],
  },
];


export {
  MOKE_MENU
}