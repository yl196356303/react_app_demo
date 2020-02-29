import React, { Component } from 'react'
import {
    Button
} from 'antd'
import Article from './pages/Article'


class App extends Component {
    render() {
        return (
            <div>
                App
                <Button type='primary'>测试</Button>
                <Article />
            </div>
        )
    }
}

export default App
