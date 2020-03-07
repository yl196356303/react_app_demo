import React, { Component } from 'react'
import { adminRouter } from './routes'
import { Route, Switch, Redirect } from 'react-router-dom'
import Layout from './layout'
import './style/App.less'
import { connect } from 'react-redux'

const mapState = (state) => {
    return {
        isLogin: state.user.isLogin,
        role: state.user.role
    }
}

@connect(mapState)
class App extends Component {
    render() {
        return (
            this.props.isLogin
            ?
            <Layout>
                <Switch>
                    {
                        adminRouter.map(route => {
                            return (
                                <Route
                                    key={ route.path }
                                    path={ route.path }
                                    exact={ route.exact }
                                    render={ routerProps => {
                                        const isRole = route.role.includes(this.props.role)
                                        return isRole ? <route.component { ...routerProps } /> : <Redirect to='/admin/noauth' />
                                    } }
                                />
                            )
                        })
                    }
                    <Redirect to={ adminRouter[0].path } from='/admin' exact />
                    <Redirect to='/404' />
                </Switch>
            </Layout>
            :
            <Redirect to='/login' />
        )
    }
}

export default App
