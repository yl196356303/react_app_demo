import React, { Component } from 'react'
import {
    Form,
    Input,
    Button,
    Checkbox,
    Card
} from 'antd'
import './login.less'
import { login } from '../../actions/login'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
}
const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
}

const mapState = state => {
    return {
        isloading: state.user.isloading,
        islogin: state.user.isLogin
    }
}

@connect(mapState, { login })
class Login extends Component {
    onFinish = values => {
        this.props.login(values)
    }
    render() {
        console.log(this.props.islogin)
        return (
            this.props.islogin
            ?
            <Redirect to='admin' />
            :
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
                            <Input disabled={ this.props.isloading } placeholder='用户名' />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={ [{ required: true, message: '密码必填' }] }
                        >
                            <Input.Password disabled={ this.props.isloading } placeholder='密码' />
                        </Form.Item>

                        <Form.Item { ...tailLayout } name="remember" valuePropName="checked">
                            <Checkbox disabled={ this.props.isloading }>记住我</Checkbox>
                        </Form.Item>

                        <Form.Item { ...tailLayout }>
                            <Button loading={ this.props.isloading } type="primary" htmlType="submit">
                                登录
                             </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Login
