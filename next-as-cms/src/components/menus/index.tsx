import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { Avatar, Layout, Menu, MenuProps } from "antd";
import { useRouter } from "next/router";
import { MenuInfo } from "rc-menu/lib/interface";
import { createFromIconfontCN } from "@ant-design/icons/lib";
import MOKE_MENU from "@/config/menus";
import HomeIndex from "../../pages/index";

type Props = {
  children?: ReactNode;
}
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

const getIcon = (iconName: any): ReactNode => {
  if (!iconName.startsWith("icon-")) {
    iconName = "icon-" + iconName;
  }
  return <IconFont type={iconName} style={{ fontSize: 20 }} />;
};

const defaultOpenTab: TabItem[] = [
  {
    key: "/",
    title: "首页",
    path: "/",
    content: HomeIndex.call(this, {}, null),
  },
];

export default function Menus({ children }: Props) {
    const router = useRouter();
    const [menus, setMenus] = useState<MenuItem[]>([]);
    const [menuRoots, setMenuRoots] = useState<MenuKeyRoot[]>([]);
    const [menuLabels, setMenuLables] = useState<MenuKeyLabel[]>([]);
    const [selectedMenu, setSelectedMenu] = useState<string[]>(["/"]);
    const [openMenu, setOpenMenu] = useState<string[]>([]);
    const [openTab, setOpenTab] = useState<TabItem[]>(defaultOpenTab);
    const [activeTab, setActiveTab] = useState("/");
    const currentPath = router.pathname;

    const getParentMenuKey = (path: string) => {
      const menuRoot = menuRoots.filter((m) => {
        return m.key == path;
      });
      return menuRoot[0]?.rootKey;
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

    const getMenuList = (menus: MenuItem[]) => {
      // TODO 可以使用远程查询
      debugger
      for (let i = 0; i < menus.length; i++) {
        let item = menus[i];
        if (item.icon) {
          item.icon = getIcon(item.icon);
        }
      }
      return MOKE_MENU;
    };

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

    const menuList = getMenuList(MOKE_MENU);

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

    const onClickMenu = (event: MenuInfo) => {
        router.push(event.key); // , undefined, { shallow: true }
    };

    useEffect(() => {
      parseMenuLabel(menuList);
      setMenus(menuList)
    }, [])

    useEffect(() => {
      // 设置 tab 列表
      createTabList();
    }, [currentPath, menuLabels]);
  
    return (
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
    )
}