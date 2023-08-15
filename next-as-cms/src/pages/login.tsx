import type { NextPage } from "next";
import http from "@/common/utils/http.js"
import { getUUID } from "@/common/utils/uuid.js"
import { Form, Button, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// 登录确认
const login = async (values: any, router: any) => {
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

const LoginPage = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uuid, setUuid] = useState("");

  const router = useRouter();

  const wrapperCol = {
    offset: 5,
    span: 17
  }

  const onFinish = (values: any) => {
    console.log("Success:", values);
    login(Object.assign(values, { uuid: uuid }), router);
  };

  // 打开注册窗口
  const onRegister = () => {
    setIsModalOpen(true)
  }

  // 注册确认并关闭窗口
  const onRegisterFinish = (values: any) => {
      registerUser(values, setIsModalOpen)
  }

  // 获取并设置UUID
  const getUuidInLogin = () :String => {
    let _uuid = getUUID();
    setUuid(_uuid);
    return _uuid;
  }

  // 更换验证码
  const onChangeCaptcha = () => {
    setImgSrc(`/api/captcha.jpg?uuid=${getUuidInLogin()}`);
  }
  
  useEffect(() => {
    setImgSrc(`/api/captcha.jpg?uuid=${getUuidInLogin()}`);
  }, [])

  return (
    <div
      className="flex h-screen w-full content-center justify-center"
      style={{ backgroundImage: `url(/images/punk1.jpeg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
    >
      <div className="my-auto mx-8 flex w-1/4 rounded-lg bg-gray-50">
        <div className="flex rounded-lg border px-12 py-6  shadow-md w-full">
          <Form
            className="w-full"
            name="basic"
            labelCol={{ span: wrapperCol.offset }}
            wrapperCol={{ span: wrapperCol.span }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            size="large"
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
              name="code"
              rules={[{ required: true, message: "请输入验证码!" }]}
              wrapperCol={{ span: 17 }}
            >
              <div className="flex">
                <div><Input></Input></div>
                <div className="identifying-img border ml-2">
                  <img src={imgSrc} onClick={onChangeCaptcha} className="img h-10"/>
                </div>
              </div>
            </Form.Item>
            <Form.Item wrapperCol={wrapperCol}>
              <div className="flex justify-center">
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
                <Button type="default" onClick={onRegister}  className="ml-5">
                  注册
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>

      <Modal title="注册账号" width={600} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={[]}>
        <div>
            <Form
                name="nest-messages"
                onFinish={onRegisterFinish}
                labelCol={{ span: wrapperCol.offset }}
                wrapperCol={{ span: wrapperCol.span }}
                autoComplete="off"
            >
                <Form.Item 
                    label="账 号" 
                    name="username" 
                    validateTrigger="onChange"
                    rules={[
                        { required: true, message: 'Please input your username!' },
                        { validator:(rules,value,callback)=>{handleCheckUsername(rules,value,callback)} },
                    ]}
                >
                    <Input/>
                    {/* <Input onChange={handleInputChange}/> */}
                </Form.Item>
                <Form.Item label="密 码" name="password" rules={[{ required: true },{ type: 'string', min: 6 }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="邮 箱" name="email" rules={[{ required: true },{ type: 'string' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="手机号码" name="mobile" rules={[{ required: true },{ type: 'string', min: 11 }]}>
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={wrapperCol}>
                    <Button type="default">清空</Button>
                    <Button type="primary" htmlType="submit" style={{marginLeft: '10px'}}>提交</Button>
                </Form.Item>
            </Form>
        </div>
    </Modal>
    </div>
  );
};

export default LoginPage;
