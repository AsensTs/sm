import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";

export function QueryForm<T>({
  id,
  queryFields,
  onQuery = (formData) => {
    return true;
  },
}: QueryFormProps<T>) {
  const [form] = Form.useForm();
  const [fields, setFields] = useState<QueryFormFiled[]>(queryFields);
  const onFinish = (values: any) => {
    console.log("form values:", values);
    onQuery(values);
  };

  const onClear = () => {
    form.resetFields();
  };

  useEffect(() => {
    setFields(queryFields);
    console.log(fields);
  }, [queryFields]);

  return (
    <Form
      name={id}
      form={form}
      labelAlign="right"
      labelWrap
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Row align={"middle"} justify={"start"} gutter={[1, 0]} wrap={true} className="flex items-center">
        <>
          {fields && fields.length > 0 ? (
            fields.map((field) => {
              return (
                <Col span={6} key={`${id}_${field.name}`}>
                  {field.type === "input" && (
                    <>
                      <Form.Item label={field.label} name={field.name} style={{marginBottom: '0px'}}>
                        <Input />
                      </Form.Item>
                    </>
                  )}
                  {field.type === "select" && (
                    <>
                      <Form.Item
                        label={field.label}
                        name={field.name}
                        initialValue={field.selectDefaultSelected}
                        style={{marginBottom: '0px'}}
                      >
                        <Select
                          options={field.selectOption}
                          placeholder="请选择"
                          // defaultValue={field.selectDefaultSelected}
                        />
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

        <Col span={5} offset={1}>
          <Form.Item>
            <div className="flex">
              <Button type="primary" className="w-24" htmlType="submit" icon={<SearchOutlined />}>
                查询
              </Button>
              <Button
                className="ml-6 w-24"
                htmlType="button"
                onClick={onClear}
                icon={<UndoOutlined />}
              >
                清空
              </Button>
            </div>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
