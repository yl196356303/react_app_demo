import React, { Component } from 'react'
import { getArticleList, deleteByIdArticle } from '../../api'
import { dateFormat } from '../../utils'
import XLSX from 'xlsx'
import {
  Card,
  Button,
  Table,
  Tag,
  Modal,
  message
} from 'antd'

const titleDisplayMap = {
  id: 'id',
  title: '标题',
  author: '作者',
  amount: '阅读量',
  craeteAt: '创建时间'
}

export default class Article extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],
      columns: [],
      total: 0,
      isTableLoading: false,
      isModal: false,
      modalTitle: '',
      isModalLoading: false,
      articleId: null
    }
  }
  getColumns = (columnKeys) => {
    let column = []
    column = columnKeys.map(item => {
      if (item === 'amount') {
        return {
          title: titleDisplayMap[item],
          dataIndex: item,
          render: (text, record) => {
            const { amount } = record
            return <Tag color={ amount > 200 ? 'red' : 'green' }>{ record[item] }</Tag>
          }
        }
      }
      if (item === 'craeteAt') {
        return {
          title: titleDisplayMap[item],
          dataIndex: item,
          render: (text, record) => {
            const { craeteAt } = record
            return dateFormat('YYYY-mm-dd HH:MM', craeteAt)
          }
        }
      }
      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item
      }
    })
    column.push({
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <span>
            <Button onClick={this.toArticleEdit.bind(this, record.id)} style={ { marginRight: '8px' } } size='small' type='primary'>编辑</Button>
            <Button onClick={this.showModal.bind(this, record)} size='small' type='danger'>删除</Button>
          </span>
        )
      }
    })
    return column
  }
  getArticle = async () => {
    this.setState({
      isTableLoading: true
    })
    const res = await getArticleList()
    let columns = Object.keys(res.result.list[0])
    columns = this.getColumns(columns)
    this.setState({
      total: res.result.total,
      dataSource: res.result.list,
      columns,
      isTableLoading: false
    })
  }
  async componentDidMount() {
    this.getArticle()
  }
  _exportFile = () => {
    const data = this.state.dataSource.reduce((a, b, index) => {
      if (index === 1) {
        return [Object.keys(a), Object.values(a), Object.values(b)]
      }
      return [...Object.values(a), Object.values(b)]
    })
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS")
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "sheetjs.xlsx")
  }
  showModal = (record) => {
    this.setState({
      modalTitle: record.title,
      isModal: true,
      articleId: record.id
    })
  }
  closeModal = () => {
    this.setState({
      isModal: false,
      isModalLoading: false
    })
  }
  deleteArticle = async id => {
    this.setState({
      isModalLoading: true
    })
    const res = await deleteByIdArticle(id)
    this.setState({
      isModalLoading: false,
      isModal: false
    }, () => {
      this.getArticle()
    })
    message.success(res.result.msg)
  }
  toArticleEdit = id => {
    this.props.history.push(`/admin/article/edit/${id}`)
  }
  render() {
    const {
      columns,
      dataSource,
      total,
      isTableLoading,
      isModal,
      modalTitle,
      isModalLoading,
      articleId
    } = this.state
    return (
      <Card
        title="文章列表"
        extra={ <Button onClick={ this._exportFile }>导出Excel</Button> }
      >
        <Table
          loading={ isTableLoading }
          rowKey={ record => record.id }
          dataSource={ dataSource }
          columns={ columns }
          pagination={ {
            total: total
          } } />

        <Modal
          confirmLoading={ isModalLoading }
          visible={ isModal }
          title={ modalTitle }
          onCancel={ this.closeModal } 
          onOk={ this.deleteArticle.bind(this, articleId) }>
          <p>你确定要删除这篇文章吗？谨慎操作！！！</p>
        </Modal>
      </Card>
    )
  }
}
