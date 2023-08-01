import { Menu } from 'antd';
import React, { useState } from 'react';
import type { MenuProps, MenuTheme } from 'antd';
import menus from "@/config/menus"
import { useRouter } from 'next/navigation';

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