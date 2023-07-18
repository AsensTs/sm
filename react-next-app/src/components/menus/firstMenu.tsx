import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import menuStyle from "@/assets/styles/primary/menu.module.scss";


const items: MenuProps['items'] = [
  {
    label: 'Navigation One',
    key: 'mail',
  },
  {
    label: 'Navigation Two',
    key: 'app',
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
];

const App: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu className={menuStyle.headerMenu} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default App;