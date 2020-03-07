import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
    Layout,
    Menu,
    Dropdown,
    Avatar,
    Badge
} from 'antd'
import { DownOutlined } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import './Header.less'
import { connect } from 'react-redux'
import { getNotifiactions } from '../../actions/notifiaction'
import { logout } from '../../actions/login'

const { Header } = Layout

const mapState = state => {
    console.log(state)
    const { notificationList } = state.notification
    return {
        notificationCount: notificationList.filter(item => item.hasRead === false).length,
        displayName: state.user.displayName,
        avatar: state.user.avatar
    }
}

@connect(mapState, { getNotifiactions, logout })
@withRouter
class FrameHeader extends Component {
    onMenuItem = ({ key }) => {
        key === '/logout' ? this.props.logout() : this.props.history.push(key)
    }
    renderMenu = () => {
        return (
            <Menu onClick={ this.onMenuItem }>
                <Menu.Item key="/admin/notification">
                    <Badge dot={ Boolean(this.props.notificationCount) }>
                        通知中心
                    </Badge>
                </Menu.Item>
                <Menu.Item key="/admin/profile">
                    个人设置
                </Menu.Item>
                <Menu.Item key="/logout">
                    退出登录
                </Menu.Item>
            </Menu>
        )
    }
    componentDidMount () {
        this.props.getNotifiactions()
    }
    render() {
        const {
            notificationCount
        } = this.props
        return (
            <Header className="header">
                <div className="logo">
                    <img src={ logo } alt="logo" />
                </div>
                <div className='yl-headerRight'>
                    <Avatar src={ this.props.avatar } />
                    <Dropdown className='yl-dropdow' overlay={ this.renderMenu } trigger={ ['click'] }>
                        <Badge count={ notificationCount } offset={ [8, -10] }>
                            欢迎！{ this.props.displayName }<DownOutlined />
                        </Badge>
                    </Dropdown>
                </div>
            </Header>
        )
    }
}

export default FrameHeader