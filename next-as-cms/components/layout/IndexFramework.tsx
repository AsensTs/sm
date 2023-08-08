import {
  CaretLeftFilled,
  CaretRightFilled
} from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons/lib";
import { Avatar, Layout, Menu, MenuProps } from "antd";
import { useRouter } from "next/router";
import { MenuInfo } from "rc-menu/lib/interface";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import HomeIndex from "../../pages/index";
import { TabWindows } from "../base/TabWindows";

const { Header, Content, Sider } = Layout;

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

interface MenuKeyLabel {
  key: string;
  label: string;
}

interface MenuKeyRoot {
  key: string; // 菜单 key
  rootKey: string; // 对应的跟目录 key
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
    key: `/`,
    label: `首页`,
    icon: getIcon("icon-home"),
    link: `/`,
    type: `ORIGIN`,
  },
  {
    id: 1,
    key: `/authority`,
    label: `权限管理`,
    icon: getIcon("icon-home"),
    link: `/authority`,
    type: `ORIGIN`,
    children: [
      {
        id: 2,
        key: `/authority/user`,
        label: `用户管理`,
        icon: getIcon("icon-nickname"),
        link: `/authority/user`,
        type: "ORIGIN",
      },
      {
        id: 3,
        key: `/authority/role`,
        label: `角色管理`,
        icon: getIcon("icon-addresslist"), //React.createElement(TeamOutlined),
        link: `/authority/role`,
        type: `ORIGIN`,
      },
    ],
  },
];

interface NormalLayoutProps {
  children?: ReactNode;
}

const defaultOpenTab: TabItem[] = [
  {
    key: `/`,
    title: "首页",
    path: `/`,
    content: HomeIndex.call(this, {}, null),
  },
];

export const IndexFramework: React.FC<NormalLayoutProps> = ({ children }) => {
  console.log("children", children); // FIXME 渲染次数较多
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [openTab, setOpenTab] = useState<TabItem[]>(defaultOpenTab);
  const [activeTab, setActiveTab] = useState("/");
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [menuLabels, setMenuLables] = useState<MenuKeyLabel[]>([]);
  const [menuRoots, setMenuRoots] = useState<MenuKeyRoot[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string[]>(["/"]);
  const [openMenu, setOpenMenu] = useState<string[]>([]);
  const [showMenuCollapsed, setShowMenuCollapsed] = useState(false);
  const currentPath = router.pathname;
  const getMenuList = () => {
    // TODO 使用远程查询
    return MOKE_MENU;
  };
  const parseMenuLabel = (menuList: MenuItem[]) => {
    const labels: MenuKeyLabel[] = [];
    const roots: MenuKeyRoot[] = [];
    menuList.forEach((m) => {
      const key = m.link;
      const label = m.label;
      labels.push({ key, label });
      if (m.children && m.children.length > 0) {
        parseChildrenMenuLabel(labels, roots, m, m.children, key);
      }
    });
    setMenuLables(labels);
    setMenuRoots(roots);
  };

  const parseChildrenMenuLabel = (
    labels: MenuKeyLabel[],
    roots: MenuKeyRoot[],
    m: MenuItem,
    children: MenuItem[],
    rootKey: string
  ) => {
    children.forEach((child) => {
      const key = child.link; // m.key + "/" + child.key;
      const label = child.label;
      labels.push({ key, label });
      roots.push({ key, rootKey });
      if (child.children && child.children.length > 0) {
        parseChildrenMenuLabel(labels, roots, child, child.children, rootKey);
      }
    });
  };

  const getParentMenuKey = (path: string) => {
    const menuRoot = menuRoots.filter((m) => {
      return m.key == path;
    });
    return menuRoot[0]?.rootKey;
  };

  const menuList = getMenuList();

  const createTabList = () => {
    setOpenTab((t) => {
      // 页面加载时处理tab 页签
      const pagePath = currentPath;
      const existTab = t.filter((t) => {
        return t.key == pagePath;
      });

      setActiveTab(pagePath);
      if (!existTab || existTab.length == 0) {
        const openLabel = menuLabels.filter((m) => {
          return m.key == pagePath;
        });
        let lable: string = (children as ReactElement)?.props.title;
        if (openLabel && openLabel.length > 0) {
          lable = openLabel[0]?.label;
        }
        t = [
          ...t,
          {
            key: pagePath,
            title: lable,
            path: pagePath,
            content: children,
          },
        ];
      }
      const parent = getParentMenuKey(pagePath);
      setOpenMenu([parent]);
      setSelectedMenu([pagePath]);
      return t;
    });
  };

  useEffect(() => {
    // 解析设置菜单
    parseMenuLabel(menuList);
    setMenus(menuList);
  }, []);

  useEffect(() => {
    // 设置 tab 列表
    createTabList();
  }, [currentPath, menuLabels]);

  const onClickMenu = (event: MenuInfo) => {
    router.push(event.key); // , undefined, { shallow: true }
  };

  const onTabClick = (key: string) => {
    router.push(key);
  };
  const onTabEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => {
    if (action === "add") {
    } else {
      const targetIndex = openTab.findIndex((pane) => pane.key === targetKey);
      const restTab = openTab.filter((pane) => pane.key !== targetKey);
      if (restTab.length && targetKey === activeTab) {
        const { key } = restTab[targetIndex === restTab.length ? targetIndex - 1 : targetIndex];
        router.push(key);
      }
      setOpenTab(restTab);
    }
  };

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openMenu.indexOf(key) === -1);
    const allLeafMenu: string[] = [];
    menuRoots.forEach((m) => {
      allLeafMenu.push(m.key);
    });
    if (allLeafMenu.indexOf(latestOpenKey!) === -1) {
      setOpenMenu(keys);
    } else {
      setOpenMenu(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onMouseEnterMenu = () => {
    setShowMenuCollapsed(true);
  };

  const onMouseLeaveMenu = () => {
    setShowMenuCollapsed(false);
  };

  const onCollapsedClick = () => {
    setCollapsed((c) => !c);
  };

  return (
    <Layout className="h-screen">
      <Layout>
        <Sider
          className="relative h-full w-[200] overflow-auto bg-gray-100"
          trigger={null}
          collapsible
          collapsed={collapsed}
          onMouseEnter={onMouseEnterMenu}
          onMouseLeave={onMouseLeaveMenu}
        >
          <div className=" mx-4 mt-4 mb-4 h-8 w-12 bg-black " />
          <Menu
            theme="dark"
            className="h-full"
            mode="inline"
            items={menus}
            selectedKeys={selectedMenu}
            openKeys={openMenu}
            onOpenChange={onOpenChange}
            onClick={(event) => {
              onClickMenu(event);
            }}
          />
          {showMenuCollapsed && (
            <>
              <div
                className="absolute right-0 top-[50%] my-0 h-10 rounded-l-md bg-gray-200"
                onClick={onCollapsedClick}
              >
                {" "}
                {collapsed ? (
                  <CaretRightFilled className="relative mt-3" />
                ) : (
                  <CaretLeftFilled className="relative mt-3" />
                )}
              </div>
            </>
          )}
        </Sider>
        <Layout className="pl-2 pr-2 pb-4">
          <Header className="m-0 border-b !bg-white">
            <div className="float-right mx-auto mt-3 flex h-10 w-10">
              <Avatar src="https://joeschmoe.io/api/v1/random" />
            </div>
          </Header>
          <Content className="min-h-[280] w-full overflow-scroll scroll-smooth bg-white p-3">
            <TabWindows
              activeTab={activeTab}
              openTab={openTab}
              onTabClick={onTabClick}
              onTabEdit={onTabEdit}
            ></TabWindows>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
