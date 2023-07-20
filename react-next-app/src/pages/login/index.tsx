import "./login.scss"
import "@/common/styles/global.scss"
import { useRouter } from "next/router";
import http from "@/common/utils/http.js"
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useEffect } from "react";


const onFinish = async (values: any, router: any) => {
    try {
        let res = await http.post("/login", values);
        if (res.code == 200) {
            message.success("登录成功！");
            router.push("/");
        }
    } catch (error) {
        throw error;
    }
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const Login: React.FC = () => {
    
    const router = useRouter();
    let wrapperCol = {
        offset: 6,
        span: 14
    }
    return (
        <div className="login_page">
            <div>
                <div className="login_title">
                    <p className="title">登录界面</p>
                </div>
                <div className="login_form">
                    <Form
                        className="form"
                        name="basic"
                        labelCol={{ span: wrapperCol.offset }}
                        wrapperCol={{ span: wrapperCol.span }}
                        initialValues={{ remember: true }}
                        onFinish={(values) => onFinish(values, router)}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input size="large"/>
                        </Form.Item>

                        <Form.Item
                            label="密 码"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password  size="large"/>
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={wrapperCol}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={wrapperCol}>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login 