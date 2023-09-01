import React, { useEffect, useState } from 'react';
import { Space, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import http from "@/common/utils/http.js"
import { Form, Button, Input, message, Modal } from "antd";

interface DataType {
  key: React.ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}

const columns: ColumnsType<DataType> = [
  { title: '分类', dataIndex: 'name', key: 'name' },
  { title: '是否显示', dataIndex: 'showStatus', key: 'showStatus', width: '12%' },
  { title: '商品数量', dataIndex: 'productCount', key: 'productCount', width: '30%'},
];

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<DataType> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const getProductCategoryList = async () => {
    try {
        let res = await http.get("/api/product/category/list");
        if (res.code == 200) {
          return res.data;
        } else {
          message.error("获取数据失败！");
        }
        return [];
    } catch (error) {
        message.error("获取数据失败！");
        throw error;
    }
}

const App: React.FC = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const init = async () => {
      let data = await getProductCategoryList();
      setTableData(data);
    }
    init();
  }, [])
  return (
    <>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={tableData}
      />
    </>
  );
};

export default App;
