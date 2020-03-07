import React, { Component } from 'react'
import {
  Card,
  List,
  Avatar,
  Button,
  Badge,
  Spin
} from 'antd'
import { connect } from 'react-redux'
import { notificationRead, notificationAllRead } from '../../actions/notifiaction'

const mapState = (state) => {
  const { notificationList, isloading } = state.notification
  return {
    notificationList,
    isloading
  }
}

@connect(mapState, { notificationRead, notificationAllRead })
class Notification extends Component {
  render() {
    const {
      notificationList,
      isloading
    } = this.props
    return (
      <Spin spinning={ isloading }>
        <Card
          title='通知中心'
          extra={
            <Button
              onClick={ this.props.notificationAllRead }
              disabled={ notificationList.every(item => item.hasRead === true) }>全部标记为已读</Button>
          }>
          <List
            itemLayout="horizontal"
            dataSource={ notificationList }
            renderItem={ item => (
              <List.Item
                extra={
                  item.hasRead
                    ?
                    null
                    :
                    <Button
                      onClick={ this.props.notificationRead.bind(this, item.id) }>标记为已读</Button> }>
                <List.Item.Meta
                  avatar={ <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> }
                  title={ <a href="https://ant.design"><Badge dot={ !item.hasRead }>{ item.title }</Badge></a> }
                  description={ item.desc }
                />
              </List.Item>
            ) }
          />
        </Card>
      </Spin>
    )
  }
}

export default Notification