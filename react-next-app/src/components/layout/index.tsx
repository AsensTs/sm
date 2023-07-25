'use client'
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import LayoutStyle from "./layout.module.scss"

const { Header, Sider, Content } = Layout;

interface LayoutProps {
    children: any
}

const App: React.FC<LayoutProps> = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={LayoutStyle.layout}>
      <Sider className={LayoutStyle.sider} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
      </Sider>
      <Layout>
        <Header className={LayoutStyle.header} style={{ padding: 0 }}>
          <Button
            className={LayoutStyle.toggle}
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content className={LayoutStyle.main} style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
            {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;