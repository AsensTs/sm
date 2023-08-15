import type { NextPage } from "next";
import http from "@/common/utils/http.js"
import { getUUID } from "@/common/utils/uuid.js"
import { Form, Button, Input, message } from "antd";
import { useEffect, useState } from "react";

// 登录确认
const onFinish = async (values: any, router: any) => {
  try {
      let res = await http.post("/api/login", values);
      console.log(res);
      if (res.code == 200) {
          message.success("登录成功！");
          router.push("/");
      } else {
          message.error("登录失败！账号或密码错误。");
      }
  } catch (error) {
      throw error;
  }
};

// 提交表单且数据验证失败后回调事件
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const registerUser = async (values: any, fn: Function) => {
  try {
      let res = await http.post("/api/register", values);
      if (res.code == 200) {
          message.success(res.message);
          fn(false);
      } else {
          message.success("注册失败！");
      }
  } catch (error) {
      message.success("注册失败！");
      throw error;
  }
}

const checkUsername = async (value: any) => {
  try {
      let res = await http.post("/api/check", {
          username: value
      });
      
      if (res.code == 200) {
          return res;
      }
  } catch (error) {
      throw error;
  }
}

const handleCheckUsername = async (rules: any, value: any, callback: any) => {
  let res = await checkUsername(value);
  if (!res.data) {
      callback(new Error(res.message));
  }
  callback();
}

// 更换验证码
const onChangeCaptcha = () => {
  console.log("更换验证码");
}

const LoginPage = () => {
  const [imgSrc, setImgSrc] = useState("");

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // 打开注册窗口
  const onRegister = () => {
    // customSetIsModalOpen(true);
  }

  // 注册确认并关闭窗口
  const onRegisterFinish = (values: any) => {
      // registerUser(values, customSetIsModalOpen)
  }

  useEffect(() => {
    setImgSrc(`/api/captcha.jpg?uuid=${getUUID()}`);
  }, [])

  return (
    <div
      className="flex h-screen w-full content-center justify-center"
      style={{ backgroundImage: `url(/images/punk1.jpeg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
    >
      <div className="my-auto mx-8 flex rounded-lg bg-gray-50">
        <div className="flex rounded-lg border px-12 py-6  shadow-md">
          <Form
            className="w-full"
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 17 }}
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
              wrapperCol={{ span: 12 }}
            >
              <div className="flex">
                <div><Input></Input></div>
                <div className="captcha-img border w-40 ml-2">
                  <img src={imgSrc} onClick={onChangeCaptcha} className="img"/>
                </div>
              </div>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 22 }}>
              <div className="flex justify-center">
                <Button type="primary" htmlType="submit" className="w-1/5 min-w-min">
                  登录
                </Button>
                <Button type="default" onClick={onRegister}  className="w-1/5 ml-5 min-w-min">
                  注册
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
