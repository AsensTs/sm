import React, { use, useState } from 'react';
import {
  LaptopOutlined, 
  NotificationOutlined, 
  UserOutlined, 
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Button, Menu, theme } from 'antd';
import SecondMenu from "@/components/menus/secondMenu";
import FirstMenu from "@/components/menus/firstMenu";
import layoutStyle from "@/assets/styles/primary/layout.module.scss";
import commonStyle from "@/assets/styles/primary/common.module.scss";


const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

const App: React.FC = ({children}: any) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className={layoutStyle.layout}>
      <Header className={layoutStyle.header} style={{ display: 'flex', alignItems: 'center' }}>
        <div className={layoutStyle.logo} />
        <FirstMenu></FirstMenu>
      </Header>
      <Layout className={layoutStyle.content}>
        <Sider className={layoutStyle.sider} width={commonStyle.siderWidth} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <SecondMenu></SecondMenu>
          <div className={layoutStyle.siderCollapsed}></div>
        </Sider>
        <Layout className={layoutStyle.pageContent} style={{ padding: '0 24px 24px' }}>
          <Content>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
};

module.exports = App;