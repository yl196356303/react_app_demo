import React, { Component } from 'react';
import { Layout } from 'antd';
import Header from './FrameHeader'
import Menu from './FrameMenu'


const { Content } = Layout;

class Frame extends Component {
    render() {
        return (
            <Layout>
                <Header />
                <Layout>
                    <Menu />
                    <Layout style={ { padding: '0 12px 12px' } }>
                        <Content
                            className="site-layout-background"
                            style={ {
                                padding: 16,
                                margin: 0,
                                minHeight: 280,
                            } }
                        >
                            { this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default Frame;