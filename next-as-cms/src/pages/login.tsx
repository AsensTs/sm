import type { NextPage } from "next";
import { Form, Button, Input } from "antd";

const LoginPage = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      className="flex h-screen w-full content-center justify-center"
      style={{ backgroundImage: `url(/images/punk1.jpeg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
    >
      <div className="my-auto mx-8 flex w-auto rounded-lg bg-gray-50">
        <div className="flex w-96 rounded-lg border px-12 py-6  shadow-md">
          <Form
            className="w-full"
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h3 className="my-6 w-full text-center text-lg"> Admin 登录</h3>
            <Form.Item
              label="账号"
              name="username"
              rules={[{ required: true, message: "请输入账号!" }]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item
              label="验证码"
              name="identifying"
              rules={[{ required: true, message: "请输入验证码!" }]}
              wrapperCol={{ span: 8 }}
            >
              <div className="flex">
                <Input></Input>
                <div></div>
              </div>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit" className="w-full">
                登录
              </Button>
            </Form.Item>
            
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
