import "@/common/styles/global.scss"
import loginStyle from "./login.module.scss"
import { useRouter } from "next/router";
import http from "@/common/utils/http.js"
import { Button, Checkbox, Form, Input, message, Modal } from 'antd';
import { useState } from "react";

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

const Login: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const router = useRouter();
    let wrapperCol = {
        offset: 6,
        span: 14
    }

    // 打开注册窗口
    const onRegister = () => {
        customSetIsModalOpen(true);
    }

    // 注册确认并关闭窗口
    const onRegisterFinish = (values: any) => {
        registerUser(values, customSetIsModalOpen)
    }
    
    // 打开关闭窗口功能
    const customSetIsModalOpen = (value: boolean) => {
        setIsModalOpen(value);
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

                <Modal className={loginStyle.modal} title="注册账号" width={600} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={[]}>
                    <div className={loginStyle.register_modal} >
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
        </div>
    )
}

export default Login 