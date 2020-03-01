import React, { Component } from 'react';
import { Layout } from 'antd'
import logo from '../../assets/images/logo.png'
import './Header.less'

const { Header } = Layout


class FrameHeader extends Component {
    render() {
        return (
            <Header className="header">
                <div className="logo">
                    <img src={ logo } alt="logo" />
                </div>
            </Header>
        )
    }
}

export default FrameHeader