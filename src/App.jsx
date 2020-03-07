import React, { Component } from 'react'
import { adminRouter } from './routes'
import { Route, Switch, Redirect } from 'react-router-dom'
import Layout from './layout'
import './style/App.less'
import { connect } from 'react-redux'

const mapState = (state) => {
    console.log(state)
    return {
        isLogin: state.user.isLogin
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
                                        return <route.component { ...routerProps } />
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
