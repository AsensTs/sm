import "@/common/styles/global.scss"
import loginStyle from "./login.module.scss"
import { useRouter } from "next/router";
import http from "@/common/utils/http.js"
import { Button, Checkbox, Form, Input, message, Modal } from 'antd';
import { useState } from "react";


// 登录确认
const onFinish = async (values: any, router: any) => {
    try {
        debugger
        let res = await http.post("/api/login", values);
        if (res.code == 200) {
            message.success("登录成功！");
            router.push("/");
        }
    } catch (error) {
        throw error;
    }
};

// 提交表单且数据验证失败后回调事件
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const registerUser = (values: any) => {

}


const Login: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const router = useRouter();
    let wrapperCol = {
        offset: 6,
        span: 14
    }

    // 打开注册窗口
    const onRegister = () => {
        setIsModalOpen(true);
    }

    // 注册确认并关闭窗口
    const onRegisterFinish = (values: any) => {
        setIsModalOpen(true);
        registerUser(values)
    }

    return (
        <div className={loginStyle.login_page}>
            <div>
                <div className={loginStyle.login_title}>
                    <p className={loginStyle.title}>登录界面</p>
                </div>
                <div className={loginStyle.login_form}>
                    <Form
                        className={loginStyle.form}
                        name="basic"
                        labelCol={{ span: wrapperCol.offset }}
                        wrapperCol={{ span: wrapperCol.span }}
                        initialValues={{ remember: true }}
                        onFinish={(values) => onFinish(values, router)}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="账 号"
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
                            <Button type="primary" htmlType="submit">登录</Button>
                            <Button type="default" onClick={onRegister} style={{marginLeft: '10px'}}>注册</Button>
                        </Form.Item>
                    </Form>
                </div>

                <Modal title="注册账号" width={600} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={[]}>
                    <div className={loginStyle.register_modal} >
                        <Form
                            name="nest-messages"
                            onFinish={onRegisterFinish}
                            labelCol={{ span: wrapperCol.offset }}
                            wrapperCol={{ span: wrapperCol.span }}
                            autoComplete="off"
                        >
                            <Form.Item label="账 号" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input/>
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
        </div>
    )
}

export default Login 