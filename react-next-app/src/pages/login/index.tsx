import "./login.scss"
import "@/common/styles/global.scss"
import { Button, Checkbox, Form, Input } from 'antd';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const Login: React.FC = () => {
    let wrapperCol = {
        offset: 6,
        span: 18
    }
    return (
        <div className="login-page">
            <div>
                <div className="login-title">
                    <p className="title">登录界面</p>
                </div>
                <div className="login-form">
                    <Form
                        className="form"
                        name="basic"
                        labelCol={{ span: wrapperCol.offset }}
                        wrapperCol={{ span: wrapperCol.span }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
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