import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { DataGrid } from "./DataGrid";
import { EditDialog } from "./EditDialog";
import { QueryForm } from "./QueryForm";

const CrudDataGrid = React.forwardRef<CrudDataGridElement, any>(function CrudDataGrid<T>(
  {
    pageQuery,
    getById,
    delById,
    submit,
    delTips,
    queryFormProps,
    dataGridProps,
    editDialogProps,
  }: CrudDataGridProps<T>,
  ref: React.ForwardedRef<CrudDataGridElement>
) {
  const dialog = useRef<DialogElement>(null);

  // 暴露方法
  useImperativeHandle(
    ref,
    () => ({
      getEditFormData: () => {
        return dialog?.current?.getFormData();
      },
      getEditForm: () => {
        return dialog?.current?.getForm();
      },
    }),
    []
  );

  const openEditDialog = (disabled: boolean) => {
    dialog?.current?.open(disabled);
  };

  const setFormDataToDialog = (data: T) => {
    dialog?.current?.setFormData(data);
  };

  // 调整查询框属性
  const transferQueryFormProps = (queryFormProps: QueryFormProps<T>) => {
    return {
      ...queryFormProps,
      onQuery: (formData: any) => {
        let continueQuery = true;
        if (queryFormProps.onQuery) {
          continueQuery = queryFormProps.onQuery(formData);
        }
        // TODO 使用查询方法查询数据
        // setGridDataList(data.list);
        if (continueQuery) {
          if (pageQuery && pageQuery instanceof Function) {
            pageQuery(formData, {
              onSuccess: (result: QueryResult<T[]>) => {
                setFinalDataGridProps({ ...finalDataGridProps, list: result.list });
              },
            });
          } else {
            console.log("未配置 pageQuery 方法");
          }
        } else {
          console.log("pageQuery 返回 false，中断查询");
        }
        return continueQuery;
      },
    };
  };

  // 调整表格属性
  const transferDataGrirdProps = (dataGridProps: DataGridProps<T>) => {
    return {
      ...dataGridProps,
      onAddClick: () => {
        let canAdd = true;
        if (dataGridProps.onAddClick) {
          canAdd = dataGridProps.onAddClick();
        }
        console.log("canAdd", canAdd);
        if (canAdd) {
          // 进入新增
          // 2、 弹框
          openEditDialog(false);
        } else {
          console.log("onAddClick 返回 false，中断新增");
        }
        return canAdd;
      },
      onEditClick: (id: React.Key, record: T) => {
        let canEdit = true;
        if (dataGridProps.onEditClick) {
          canEdit = dataGridProps.onEditClick(id, record);
        }
        console.log("canEdit", canEdit);
        if (canEdit) {
          // 进入编辑
          // 1、 获取数据
          console.log("当前数据是：", record);
          setFormDataToDialog(record);

          // 2、 弹框
          openEditDialog(false);
        } else {
          console.log("onEditClick 返回 false，中断编辑");
        }
        return canEdit;
      },
      onViewClick: (id: React.Key, record: T) => {
        let canView = true;
        if (dataGridProps.onViewClick) {
          canView = dataGridProps.onViewClick(id, record);
        }
        if (canView) {
          // 进入查看
          // 1、 获取数据
          console.log("当前数据是：", record);
          setFormDataToDialog(record);
          // 2、 弹框
          openEditDialog(true);
        } else {
          console.log("onViewClick 返回 false，中断查看");
        }
        return canView;
      },
      onDelClick: (ids: React.Key[], records: T[]) => {
        let canDel = true;
        if (dataGridProps.onDelClick) {
          canDel = dataGridProps.onDelClick(ids, records);
        }
        console.log("canDel", canDel);
        if (canDel) {
          // 进入删除
          let delTipsStr =
            delTips && delTips instanceof Function ? delTips(ids, records) : `确认删除当前记录?`;
          // 1、 提示是否删除
          Modal.confirm({
            title: "删除",
            icon: <ExclamationCircleFilled />,
            content: delTipsStr,
            okText: "确定",
            cancelText: "取消",
            onOk() {
              // 2、 删除
              if (delById && delById instanceof Function) {
                delById(ids, {
                  onSuccess: (result: RequestResult<any>) => {},
                });
              } else {
                console.log("未配置 delById 方法");
              }
            },
            onCancel() {
              console.log("Cancel Del");
            },
          });
        } else {
          console.log("onDelClick 返回 false，中断删除");
        }
        return canDel;
      },
    };
  };

  const transferEditDialogProps = (editDialogProps: EditDialogProps<T>) => {
    return {
      ...editDialogProps,
      onSubmit: (data: T) => {
        console.log("submit data", data);
        let canSubmit = true;
        if (editDialogProps.onSubmit) {
          canSubmit = editDialogProps.onSubmit(data);
          console.log("submit real data", data);
        }
        if (canSubmit) {
          // 调用提交
          // 1、调用请求
          // 2、弹出成功的提示
        } else {
          console.log("onSubmit 返回 false，中断提交");
        }
        return canSubmit;
      },
    };
  };

  const [finalQueryFormProps, setFinalQueryFormProps] = useState(
    transferQueryFormProps(queryFormProps)
  );

  const [finalDataGridProps, setFinalDataGridProps] = useState(
    transferDataGrirdProps(dataGridProps)
  );

  const [finalEditDialogProps, setFinalEditDialogProps] = useState(
    transferEditDialogProps(editDialogProps)
  );

  useEffect(() => {
    setFinalQueryFormProps(transferQueryFormProps(queryFormProps));
  }, [queryFormProps]);

  useEffect(() => {
    setFinalDataGridProps(transferDataGrirdProps(dataGridProps));
  }, [dataGridProps]);

  useEffect(() => {
    setFinalEditDialogProps(transferEditDialogProps(editDialogProps));
  }, [editDialogProps]);

  return (
    <>
      <div className="w-full">
        <QueryForm {...finalQueryFormProps} />
      </div>
      <DataGrid {...finalDataGridProps} />
      <EditDialog {...finalEditDialogProps} ref={dialog} />
    </>
  );
});

export { CrudDataGrid };
