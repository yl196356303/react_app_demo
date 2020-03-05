import React from 'react'
import { render } from 'react-dom'
import {
     HashRouter as Router, 
     Route, 
     Switch,
     Redirect
    } from 'react-router-dom'
    
import App from './App'
import { mainRouter } from './routes'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'

render(
    <ConfigProvider locale={zhCN}>
        <Router>
            <Switch>
                <Route path='/admin' render={(routerProps) => {
                    return <App {...routerProps} />
                }}/>
                {
                    mainRouter.map(route => {
                        return (
                            <Route key={route.path} path={route.path} component={route.component} />
                        )
                    })
                }
                <Redirect to='/admin' from='/' exact />
                <Redirect to='/404' />
            </Switch>
        </Router>
    </ConfigProvider>,
    document.querySelector('#root')
)