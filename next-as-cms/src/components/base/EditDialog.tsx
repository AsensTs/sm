import { LoadingOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Switch,
  TimePicker,
  Upload
} from "antd";
import React, { useEffect, useImperativeHandle, useState } from "react";

// 解决 React.forwardRef 丢失泛型问题  https://fettblog.eu/typescript-react-generic-forward-refs/
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

// 支持父组件通过 ref 来调用 ，使用 forwardRef 包装。
const EditDialog = React.forwardRef<DialogElement, any>(function EditDialog<T>(
  {
    id,
    width = "800px",
    height = "550px",
    title,
    initData,
    editFields,
    okText = "提交",
    cancelText = "取消",
    extendBtns,
    onSubmit = (data: T) => {
      return true;
    },
    onSetFormData = (form: FormInstance, data: T) => {},
  }: EditDialogProps<T>,
  ref: React.ForwardedRef<DialogElement>
) {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(initData);
  const [fields, setFields] = useState<EditFormFiled[]>(editFields);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const mergeFormData = { ...formData, ...values };
        console.log("submitData", mergeFormData);
        onSubmit && onSubmit(mergeFormData);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  useEffect(() => {
    setFields(editFields);
  }, [editFields]);

  useEffect(() => {
    form?.setFieldsValue(initData);
    setFormData(initData);
    onSetFormData(form, initData);
  }, [initData]);

  // 暴露方法
  useImperativeHandle(
    ref,
    () => ({
      setFormData: (formData: T) => {
        console.log("new data", formData);
        form?.setFieldsValue(formData);
        setFormData(formData);
        onSetFormData(form, formData);
      },
      getFormData: () => {
        return formData;
      },
      getForm: () => {
        return form;
      },
      open: (disabled: boolean) => {
        setOpen(true);
        setFormDisabled(disabled);
      },
      close: () => {
        setOpen(false);
      },
    }),
    [open]
  );
  const footerBtns = [
    <Button key="cancel" onClick={handleCancel}>
      {cancelText}
    </Button>,
  ];
  if (!formDisabled) {
    footerBtns.push(
      <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
        {okText}
      </Button>
    );
  }

  if (extendBtns) {
    footerBtns.push(<>{extendBtns}</>);
  }

  return (
    <Modal
      title={title}
      open={open}
      width={width}
      onOk={handleOk}
      onCancel={handleCancel}
      forceRender // fix warning : https://stackoverflow.com/questions/61056421/warning-instance-created-by-useform-is-not-connect-to-any-form-element
      footer={footerBtns}
      bodyStyle={{ height: `${height}`, overflowY: "auto" }}
    >
      <Form
        name={`${id}`}
        form={form}
        labelAlign="right"
        labelWrap
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={initData}
        autoComplete="off"
        disabled={formDisabled}
      >
        <Row align={"middle"} justify={"start"} gutter={[1, 0]} wrap={true}>
          <>
            {fields && fields.length > 0 ? (
              fields.map((field) => {
                return (
                  <Col span={field.formItemOption?.span || 12} key={`${id}_${field.name}_col`}>
                    {field.type === "input" && (
                      <>
                        <Form.Item
                          label={field.label}
                          name={field.name}
                          key={`${id}_${field.name}`}
                          {...field.formItemOption}
                        >
                          <Input {...field.inputOption} />
                        </Form.Item>
                      </>
                    )}
                    {field.type === "number" && (
                      <>
                        <Form.Item
                          label={field.label}
                          name={field.name}
                          key={`${id}_${field.name}`}
                          {...field.formItemOption}
                        >
                          <InputNumber {...field.inputNumberOption} style={{ width: "100%" }} />
                        </Form.Item>
                      </>
                    )}
                    {field.type === "select" && (
                      <>
                        <Form.Item
                          label={field.label}
                          name={field.name}
                          key={`${id}_${field.name}`}
                          {...field.formItemOption}
                        >
                          <Select
                            placeholder="请选择"
                            {...field.selectOption}
                            // defaultValue={field.selectDefaultSelected}
                          />
                        </Form.Item>
                      </>
                    )}
                    {field.type === "switch" && (
                      <>
                        <Form.Item
                          label={field.label}
                          name={field.name}
                          key={`${id}_${field.name}`}
                          valuePropName={"checked"}
                          {...field.formItemOption}
                        >
                          <Switch {...field.switchOption} />
                        </Form.Item>
                      </>
                    )}
                    {field.type === "textarea" && (
                      <>
                        <Form.Item
                          label={field.label}
                          name={field.name}
                          key={`${id}_${field.name}`}
                          {...field.formItemOption}
                        >
                          <Input.TextArea
                            {...field.textareaOption}
                            rows={field.textareaOption?.row || 4}
                          />
                        </Form.Item>
                      </>
                    )}
                    {field.type === "checkboxGroup" && (
                      <>
                        <Form.Item
                          label={field.label}
                          name={field.name}
                          key={`${id}_${field.name}`}
                          {...field.formItemOption}
                        >
                          <Checkbox.Group {...field.checkboxGroupOption} />
                        </Form.Item>
                      </>
                    )}
                    {field.type === "checkbox" && (
                      <>
                        <Form.Item
                          label={field.label}
                          name={field.name}
                          key={`${id}_${field.name}`}
                          valuePropName={"checked"}
                          {...field.formItemOption}
                        >
                          <Checkbox {...field.checkboxOption} />
                        </Form.Item>
                      </>
                    )}
                    {field.type === "radioGroup" && (
                      <>
                        <Form.Item
                          label={field.label}
                          name={field.name}
                          key={`${id}_${field.name}`}
                          // valuePropName={"checked"}
                          {...field.formItemOption}
                        >
                          <Radio.Group {...field.radioGroupOption} />
                        </Form.Item>
                      </>
                    )}
                    {field.type === "date" && (
                      <>
                        <Form.Item
                          label={field.label}
                          name={field.name}
                          key={`${id}_${field.name}`}
                          {...field.formItemOption}
                        >
                          <DatePicker {...field.dateOption} />
                        </Form.Item>
                      </>
                    )}
                    {field.type === "time" && (
                      <>
                        <Form.Item
                          label={field.label}
                          name={field.name}
                          key={`${id}_${field.name}`}
                          {...field.formItemOption}
                        >
                          <TimePicker {...field.timeOption} />
                        </Form.Item>
                      </>
                    )}
                    {field.type === "upload" && (
                      <>
                        <Form.Item
                          label={field.label}
                          name={field.name}
                          key={`${id}_${field.name}`}
                          {...field.formItemOption}
                        >
                          {field.uploadOption?.type == "file" && (
                            <Upload {...field.uploadOption}>
                              <Button icon={<UploadOutlined />}>上传文件</Button>
                            </Upload>
                          )}
                          {field.uploadOption?.type == "image" && (
                            <Upload {...field.uploadOption} listType="picture-card" className="avatar-uploader">
                              <div>
                                {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
                                <div style={{ marginTop: 8 }}>上传图片</div>
                              </div>
                            </Upload>
                          )}
                        </Form.Item>
                      </>
                    )}
                    {field.type === "custom" && (
                      <>
                        <Form.Item
                          label={field.label}
                          name={field.name}
                          key={`${id}_${field.name}`}
                          {...field.formItemOption}
                        >
                          {field.customElement()}
                        </Form.Item>
                      </>
                    )}
                  </Col>
                );
              })
            ) : (
              <>无</>
            )}
          </>
        </Row>
      </Form>
    </Modal>
  );
});

export { EditDialog };
