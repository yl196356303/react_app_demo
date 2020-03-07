import React, { Component, createRef } from 'react'
import E from 'wangeditor'
import {
    Card,
    Button,
    Form,
    Input,
    DatePicker,
    InputNumber,
    message,
    Spin
} from 'antd'
import './edit.less'
import { getArticleById, getArticleEditById } from '../../../api'

const formLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 16
    }
}


export default class Edit extends Component {
    constructor() {
        super()
        this.editorRef = createRef()
        this.formRef = createRef()
        this.state = {
            isloading: false
        }
    }
    onFinish = async value => {
        this.setState({
            isloading: true
        })
        value.createAt = value.createAt.valueOf()
        const res = await getArticleEditById(this.props.match.params.id, value)
        this.setState({
            isloading: false
        })
        this.props.history.push('/admin/article')
        message.success(res.result.msg)
    }
    onCreateAtChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    onCreateAtOk = value => {
        console.log('onOk: ', value);
    }
    initEditor = () => {
        this.editor = new E(this.editorRef.current)
        this.editor.customConfig.onchange = html => {
            this.formRef.current.setFieldsValue({
                content: html
            })
        }
        this.editor.create()
    }
    componentDidMount () {
        this.initEditor()
        this.getArticle(this.props.match.params.id)
    }
    getArticle = async Id => {
        this.setState({
            isloading: true
        })
        const res = await getArticleById(Id)
        const { id, createAt, ...data } = res.result
        this.formRef.current.setFieldsValue(data)
        this.editor.txt.html(data.content)
        this.setState({
            isloading: false
        })
    }
    render() {
        return (
            <Spin spinning={this.state.isloading} size='large'>
                <Card
                    style={ { minHeight: '100%' } }
                    title="文章列表"
                    extra={ <Button onClick={this.props.history.goBack}>取消</Button> }
                >
                    <Form
                        ref={ this.formRef }
                        { ...formLayout }
                        name="article_edit"
                        className="login-form"
                        onFinish={ this.onFinish }
                        initialValues={ { amount: 0 } }
                    >
                        <Form.Item
                            label="文章标题"
                            name="title"
                            rules={ [{ required: true, message: '文章标题必填' }] }
                        >
                            <Input placeholder="文章标题" />
                        </Form.Item>
                        <Form.Item
                            label="作者"
                            name="author"
                            rules={ [{ required: true, message: '作者必填' }] }
                        >
                            <Input placeholder="作者" />
                        </Form.Item>
                        <Form.Item
                            label="阅读量"
                            name="amount"
                        >
                            <InputNumber min={ 0 } placeholder='阅读量' />
                        </Form.Item>
                        <Form.Item
                            label="创建时间"
                            name="createAt"
                            rules={ [{ required: true, message: '创建时间必填' }] }
                        >
                            <DatePicker showTime onChange={ this.onCreateAtChange } onOk={ this.onCreateAtOk } />
                        </Form.Item>
                        <Form.Item
                            label="内容"
                            name="content"
                        >
                            <div className='yl-editor' ref={ this.editorRef } />
                        </Form.Item>
                        <Form.Item wrapperCol={ { offset: 4 } }>
                            <Button type="primary" htmlType="submit">
                                Submit
                         </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Spin>
        )
    }
}
