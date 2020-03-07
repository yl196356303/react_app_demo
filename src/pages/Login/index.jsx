import React, { Component } from 'react'
import {
    Form,
    Input,
    Button,
    Checkbox,
    Card
} from 'antd'
import './login.less'


const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
}
const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
}
export default class Login extends Component {
    onFinish = values => {
        console.log('Success:', values)
    }
    render() {
        return (
            <div className='yl-login'>
                <Card
                    className='yl-login-card'
                    title='yl-admin 登录'>
                    <Form
                        { ...layout }
                        name="basic"
                        initialValues={ { remember: true } }
                        onFinish={ this.onFinish }
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={ [{ required: true, message: '用户名必填' }] }
                        >
                            <Input placeholder='用户名' />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={ [{ required: true, message: '密码必填' }] }
                        >
                            <Input.Password placeholder='密码' />
                        </Form.Item>

                        <Form.Item { ...tailLayout } name="remember" valuePropName="checked">
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>

                        <Form.Item { ...tailLayout }>
                            <Button type="primary" htmlType="submit">
                                登录
                        </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
