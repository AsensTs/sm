import { CrudDataGrid } from "@/components/base/CrudDataGrid";
import { DataGrid } from "@/components/base/DataGrid";
import { QueryForm } from "@/components/base/QueryForm";
import { Button, Input, Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { Ref, RefObject, useRef, useState } from "react";

// 当前模块数据模型
interface User {
  id: number;
  name: string;
  mobile: string;
  sex: string;
  age?: number;
  dept: string;
  enable?: boolean;
  multiCheck?: number[];
  remark?: string;
  singleCheck?: number;
  avatar?: string;
  createTime?: any;
  customProp?: any;
}

// 查询form 定义
const queryFields: QueryFormFiled[] = [
  {
    label: "用户名",
    name: "name",
    type: "input",
  },
  {
    label: "手机号",
    name: "mobile",
    type: "input",
  },
  {
    label: "性别",
    name: "sex",
    type: "select",
    selectOption: [
      { label: "男", value: "M" },
      { label: "女", value: "F" },
    ],
    selectDefaultSelected: "M",
  },
];

// 表格列定义
const columns: ColumnsType<User> = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "手机号",
    dataIndex: "mobile",
    key: "mobile",
  },
  {
    title: "部门",
    dataIndex: "dept",
    key: "address",
  },
  {
    title: "性别",
    key: "sex",
    dataIndex: "sex",
  },
];

const data: User[] = [
  {
    id: 1,
    name: "章三",
    mobile: "13388889999",
    sex: "男",
    dept: "总经办",
    age: 40,
    enable: false,
    multiCheck: [1, 2, 3],
    singleCheck: 2,
    avatar:"image/001.png",
    createTime: moment("2023-03-07", "YYYY-MM-DD"),
  },
  {
    id: 2,
    name: "李四",
    mobile: "15134570908",
    sex: "女",
    dept: "财务部",
    enable: true,
  },
  {
    id: 3,
    name: "王武",
    mobile: "18899765432",
    sex: "男",
    dept: "销售部",
  },
  {
    id: 4,
    name: "章三",
    mobile: "13388889999",
    sex: "男",
    dept: "总经办",
  },
  {
    id: 5,
    name: "李四",
    mobile: "15134570908",
    sex: "女",
    dept: "财务部",
  },
];

const getEditFields = (dataGrid: RefObject<CrudDataGridElement>) => {
  return [
    {
      label: "用户名",
      name: "name",
      type: "input",
      formItemOption: {
        span: 24,
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
    },
    {
      label: "手机号",
      name: "mobile",
      type: "input",
    },
    {
      label: "部门",
      name: "dept",
      type: "input",
    },
    {
      label: "年龄",
      name: "age",
      type: "number",
      formItemOption: {
        wrapperCol: { span: 24 },
      },
      inputNumberOption: {},
    },
    {
      label: "性别",
      name: "sex",
      type: "select",
      selectOption: {
        options: [
          { label: "男", value: "M" },
          { label: "女", value: "F" },
        ],
      },
    },
    {
      label: "简介",
      name: "remark",
      type: "textarea",
      formItemOption: {
        span: 24,
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
      textareaOption: {},
    },
    {
      label: "是否有效",
      name: "enable",
      type: "checkbox",
    },
    {
      label: "多选",
      name: "multiCheck",
      type: "checkboxGroup",
      checkboxGroupOption: {
        options: [
          { value: 1, label: "第一个" },
          { value: 2, label: "第二个" },
          { value: 3, label: "第三个" },
          { value: 4, label: "第四个" },
        ],
        // defaultChecked: true,
        onChange: (values: any) => {
          console.log(values);
        },
      },
    },
    {
      label: "互斥单选",
      name: "singleCheck",
      type: "radioGroup",
      radioGroupOption: {
        options: [
          { value: 1, label: "第一个" },
          { value: 2, label: "第二个" },
          { value: 3, label: "第三个" },
          { value: 4, label: "第四个" },
        ],
        // defaultChecked: true,
        onChange: (values: any) => {
          console.log(values);
        },
      },
    },
    {
      label: "头像",
      name: "avatar",
      type: "upload",
      uploadOption: {
        type: "image"
      },
    },
    {
      label: "创建时间",
      name: "createTime",
      type: "date",
      dateOption: {
        placeholder: "请选择日期",
        showTime: true,
      },
    },
    {
      label: "自定义",
      name: "customProp",
      type: "custom",
      customOption: {
        placeholder: "请选择日期",
        showTime: true,
      },
      customElement: () => {
        const [value, setValue] = useState("");
        const onCustomClick = () => {
          const formData = dataGrid?.current?.getEditFormData();
          const form = dataGrid?.current?.getEditForm();
          setValue(JSON.stringify(formData));
          form.setFieldValue("customProp", JSON.stringify(formData));
        };
        return (
          <>
            <Button onClick={onCustomClick}>自定义editField</Button>
            <Input value={value}></Input>
          </>
        );
      },
    },
  ];
};

const UserIndex: React.FC = () => {
  const dataGrid = useRef<CrudDataGridElement>(null);

  // 编辑表单 定义
  const editFields: EditFormFiled[] = getEditFields(dataGrid);

  //  查询表单的配置
  const queryFormProps: QueryFormProps<User> = {
    id: "userQueryForm",
    queryFields: queryFields,
    onQuery: (queryParam) => {
      console.log("查询参数：", queryParam);
      return true;
    },
  };

  const onExtendClick = () => {
    console.log("extend click");
  };

  // 表格的配置
  const dataGridProps: DataGridProps<User> = {
    id: "userDataGrid",
    title: "用户列表",
    extendBtns: (
      <>
        <Button onClick={onExtendClick}>扩展</Button>
      </>
    ),
    extendOperate: [
      {
        label: "扩展操作列",
        key: "extend111",
      },
    ],
    extendOperateClick: (key: string, row: User) => {
      if (key === "extend111") {
        console.log(row.dept);
      }
    },
    columns: columns,
    list: data,
    onChange: (selectedRowKeys: React.Key[], selectedRows: User[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
    },
  };

  const emptyUser = {
    id: 0,
    name: "",
    mobile: "",
    sex: "M",
    dept: "",
  };

  const onFooterExtendClick = () => {
    console.log("extend footer click");
  };

  const editDialogProps: EditDialogProps<User> = {
    id: "userEditDialog",
    title: "用户编辑",
    initData: emptyUser,
    editFields: editFields,
    onSetFormData: (form, formData) => {
      console.log("enable", formData.enable);
    },
    onSubmit: (formData: User) => {
      console.log("extend onSubmit");
      formData.createTime = formData.createTime.format("YYYY-MM-DD");
      return true;
    },
    extendBtns: (
      <Button onClick={onFooterExtendClick} key="aaa">
        扩展footer
      </Button>
    ),
  };

  const crudDataGridProps: CrudDataGridProps<User> = {
    queryFormProps,
    dataGridProps,
    editDialogProps,
    pageQuery: undefined,
    getById: undefined,
    delById: undefined,
    submit: undefined,
    delTips: (ids: React.Key[], resords: User[]) => {
      let names: string[] = [];
      resords.forEach((r) => {
        names.push(r.name);
      });
      return "确认删除【" + names.join(",") + "】？";
    },
  };

  return (
    <div className="">
      <CrudDataGrid {...crudDataGridProps} ref={dataGrid} />
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      title: "用户管理",
    }, // will be passed to the page component as props
  };
}

export default UserIndex;
