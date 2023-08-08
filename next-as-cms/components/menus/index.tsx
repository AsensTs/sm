import { Menu } from 'antd';
import React, { useState } from 'react';
import type { MenuProps, MenuTheme } from 'antd';
import { useRouter } from "next/router";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const menus = [
    {
        key: "/",
        label: `首页`,
        icon: <MailOutlined />,
        children: [
            { key: "/option1", label: "option1", children: [{key: "/sub1", label: "sub1"}] },
            { key: "/option2", label: "option2" },
            { key: "/option3", label: "option3" },
        ]
    },
    {
        key: "/authority",
        label: `权限管理`,
        icon: <AppstoreOutlined />,
        children: [
            { key: "/authority/user", label: "用户管理" },
            { key: "/authority/role", label: "角色管理" },
            { key: "/option6", label: "option6" },
        ]
    },
    {
        key: "/navigation3",
        label: "导航3",
        icon: <SettingOutlined />,
        children: [
            { key: "/option7", label: "option7" },
            { key: "/option8", label: "option8" },
            { key: "/option9", label: "option9" },
        ]
    }
]

const openKey: any = []
function getCurrentAndOpenKey(menus: any) {
    let currentKey = "";
    if (!menus[0].children) {
        currentKey = menus[0].key;
    } else {
        openKey.push(menus[0].key);
        currentKey = getCurrentAndOpenKey(menus[0].children);
    }
    return currentKey;
}

const Menus = (props: any) => {
    const router = useRouter()
    let currentKey = getCurrentAndOpenKey(menus);
    const [current, setCurrent] = useState(currentKey);
    

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        router.push(e.key)
        setCurrent(e.key);
    };

      
    return (
        <Menu
            theme="dark"
            onClick={onClick}
            defaultOpenKeys={openKey}
            selectedKeys={[current]}
            mode="inline"
            items={menus}
        />
    )
}

export default Menus;