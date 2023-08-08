import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExportOutlined,
  EyeOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Button, Divider, Dropdown, MenuProps, Space, Table } from "antd";
import { TableRowSelection } from "antd/lib/table/interface";
import { MenuInfo } from "rc-menu/lib/interface";
import { useEffect, useState } from "react";

export function DataGrid<T>({
  id,
  showTitle = true,
  title,
  showToolbar = true,
  showAdd = true,
  showEdit = true,
  showView = true,
  showDel = true,
  showExport = true,
  extendBtns = [],
  showOperateColumn = true,
  showOperateEdit = true,
  showOperateView = true,
  showOperateDel = true,
  extendOperate = [],
  extendOperateClick = (key: string, row: T) => {},
  // antd table 的属性
  rowKey = "id",
  columns = [],
  list = [],
  pagination,
  onChange = (selectedRowKeys: React.Key[], selectedRows: T[]) => {},
  onSelect = (record: T, selected: boolean, selectedRows: T[], nativeEvent: Event) => {},
  onSelectAll = (selected: boolean, selectedRows: T[], changeRows: T[]) => {},
  onAddClick = () => {
    return true;
  },
  onEditClick = (id: React.Key, record: T) => {
    return true;
  },
  onViewClick = (id: React.Key, record: T) => {
    return true;
  },
  onDelClick = (ids: React.Key[], records: T[]) => {
    return true;
  },
}: DataGridProps<T>) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [tableColumns, setTableColumns] = useState(columns);
  const [tableExtendOperate, setTableExtendOperate] = useState<MenuProps["items"]>(extendOperate);

  const rowSelection: TableRowSelection<any> = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => {
      //console.log("表格内实现输出: ", selectedRows);
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);

      onChange(selectedRowKeys, selectedRows);
    },
    onSelect: (record: T, selected: boolean, selectedRows: T[], nativeEvent: Event) => {
      onSelect(record, selected, selectedRows, nativeEvent);
    },
    onSelectAll: (selected: boolean, selectedRows: T[], changeRows: T[]) => {
      onSelectAll(selected, selectedRows, changeRows);
    },
  };

  const tableExtedOperateClick = (menu: MenuInfo, record: T) => {
    extendOperateClick(menu.key, record);
  };

  const renderMoreOperateColumn = (record: T) => {
    if (tableExtendOperate && tableExtendOperate.length > 0) {
      return (
        <Dropdown
          menu={{
            items: tableExtendOperate,
            onClick: (menu) => {
              tableExtedOperateClick(menu, record);
            },
          }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            更多
            <DownOutlined />
          </a>
        </Dropdown>
      );
    }
  };

  const editClickHandler = (id: React.Key, record: T) => {
    console.log(id);
    onEditClick(id, record);
  };

  const viewClickHandler = (id: React.Key, record: T) => {
    console.log(id);
    onViewClick(id, record);
  };

  const delClickHandler = (ids: React.Key[], records: T[]) => {
    console.log(ids);
    onDelClick(ids, records);
  };

  useEffect(() => {
    if (showOperateColumn) {
      let hasOperator = false;
      columns.forEach((c) => {
        if (c.key === "_operator") {
          hasOperator = true;
        }
      });
      if (!hasOperator) {
        columns.push({
          title: "操作",
          key: "_operator",
          render: (
            _: any,
            record: any //  record 原则上应该是 T 类型，但是 T 没有指定一定需要id。
          ) => (
            <Space size="middle">
              {showOperateEdit && (
                <a
                  onClick={() => {
                    editClickHandler(record[rowKey], record);
                  }}
                >
                  编辑
                </a>
              )}
              {showOperateView && (
                <a
                  onClick={() => {
                    viewClickHandler(record[rowKey], record);
                  }}
                >
                  查看
                </a>
              )}
              {showOperateDel && (
                <a
                  onClick={() => {
                    delClickHandler([record[rowKey]], [record]);
                  }}
                >
                  删除
                </a>
              )}
              {renderMoreOperateColumn(record)}
            </Space>
          ),
        });
        setTableColumns([...columns]);
      }
    }
  }, [
    columns,
    showOperateColumn,
    showOperateEdit,
    showOperateView,
    showOperateDel,
    tableExtendOperate,
  ]);

  return (
    <>
      {showTitle && (
        <Divider orientation="left" className="my-8">
          {title}
        </Divider>
      )}
      {showToolbar && (
        <div className="flex h-10 w-full space-x-2">
          <>
            {showAdd && <Button icon={<PlusOutlined />}
             onClick={() => {
               onAddClick();
             }}
            >新增</Button>}
            {showEdit && (
              <Button
                icon={<EditOutlined />}
                disabled={Boolean(!selectedRowKeys || selectedRowKeys.length != 1)}
                onClick={() => {
                  onEditClick(selectedRowKeys[0], selectedRows[0]);
                }}
              >
                编辑
              </Button>
            )}
            {showView && (
              <Button
                icon={<EyeOutlined />}
                disabled={Boolean(!selectedRowKeys || selectedRowKeys.length != 1)}
                onClick={() => {
                  onViewClick(selectedRowKeys[0], selectedRows[0]);
                }}
              >
                查看
              </Button>
            )}
            {showDel && (
              <Button
                icon={<DeleteOutlined />}
                disabled={Boolean(!selectedRowKeys || selectedRowKeys.length == 0)}
                onClick={() => {
                  onDelClick(selectedRowKeys, selectedRows);
                }}
              >
                删除
              </Button>
            )}
            {showExport && <Button icon={<ExportOutlined />}>导出</Button>}
            {extendBtns}
          </>
        </div>
      )}

      <Table
        key={id}
        rowKey={rowKey}
        columns={tableColumns}
        dataSource={list}
        rowSelection={rowSelection}
        pagination={pagination}
      />
    </>
  );
}
