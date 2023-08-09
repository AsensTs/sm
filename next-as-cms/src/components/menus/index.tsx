import React, { ReactNode, useEffect, useState } from 'react'
import { Menu, MenuProps } from "antd";
import { MenuInfo } from 'rc-menu/lib/interface';
import { useRouter } from 'next/router';
import MOKE_MENU from "@/config/menu-config"


type Props = {}

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

export default function index({}: Props) {
  const router = useRouter();
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [menuRoots, setMenuRoots] = useState<MenuKeyRoot[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string[]>(["/"]);
  const [openMenu, setOpenMenu] = useState<string[]>([]);

  const getMenuList = () => {
    // TODO 使用远程查询
    return MOKE_MENU;
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

  const onClickMenu = (event: MenuInfo) => {
    router.push(event.key); // , undefined, { shallow: true }
  };
  

  const menuList = getMenuList();

  useEffect(() => {
    setMenus(menuList)
  }, [])
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