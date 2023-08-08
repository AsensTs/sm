// "use client"
import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons';
import Menus from "@/components/menus"
import { Layout, Button } from 'antd';

const { Header, Sider, Content } = Layout;

interface LayoutProps {
  children: any
}

const App: React.FC<LayoutProps> = ({ children }: any) => {
  
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menus></Menus>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
            {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;