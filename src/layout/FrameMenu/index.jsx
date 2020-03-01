import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { adminRouter } from '../../routes'
import { withRouter } from 'react-router-dom'
import {
    DashboardOutlined,
    UnorderedListOutlined,
    SettingOutlined
} from '@ant-design/icons'

const { Sider } = Layout
const menus = adminRouter.filter(route => route.isNav === true)


@withRouter
class FrameMenu extends Component {
    handClick = ({ key }) => {
        this.props.history.push(key)
    }
    render() {
        return (
            <Sider width={ 200 } className="site-layout-background">
                <Menu
                    mode="inline"
                    onClick={this.handClick}
                    selectedKeys={ this.props.location.pathname }
                    style={ { height: '100%', borderRight: 0 } }
                >
                    {
                        menus.map((route, index) => {   // 写到这里这个图标真的把我给整🤮了
                            switch (index) {
                                case 0:
                                    return (
                                        <Menu.Item
                                            key={ route.path }
                                        >   
                                            <DashboardOutlined />
                                            { route.title }
                                        </Menu.Item>
                                    )
                                    break;
                                case 1:
                                    return (
                                        <Menu.Item
                                            key={ route.path }
                                        >   
                                            <UnorderedListOutlined />
                                            { route.title }
                                        </Menu.Item>
                                    )
                                    break
                                case 2:
                                    return (
                                        <Menu.Item
                                            key={ route.path }
                                        >   
                                            <SettingOutlined />
                                            { route.title }
                                        </Menu.Item>
                                    )
                                    break
                                default:
                                    break;
                            }
                        })
                    }
                </Menu>
            </Sider>
        )
    }
}
export default FrameMenu