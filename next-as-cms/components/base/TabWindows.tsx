import { Tabs } from "antd";
import cx from "classnames";
import React from "react";

interface TabWindowsProps {
  className?: string;
  activeTab?: string;
  openTab?: TabItem[];
  onTabClick?: (key: string) => void;
  onTabEdit?: (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => void;
}

export const TabWindows: React.FC<TabWindowsProps> = React.memo(
  ({ className, activeTab = "home", openTab = [], onTabClick, onTabEdit }) => {
    const items: any[] = [];
    openTab.forEach((t) => {
      items.push({
        key: t.key,
        label: t.title,
        children: t?.content,
        closeIcon: t.key == "/" ? <></> : null, //  首页去掉关闭按钮
      });
    });

    return (
      <div className={cx("flex h-10 w-full", className)}>
        <Tabs
          defaultActiveKey={"home"}
          activeKey={activeTab}
          type={"editable-card"}
          hideAdd={true}
          className="w-screen"
          onTabClick={(key) => {
            onTabClick?.(key);
          }}
          onEdit={(targetKey, action) => {
            onTabEdit?.(targetKey, action);
          }}
          items={items}
        ></Tabs>
      </div>
    );
  }
);
