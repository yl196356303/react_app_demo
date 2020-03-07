import actionType from './actionType'
import { fetchLogin } from '../api'
import { 
    message
 } from 'antd'

const startLogin = () => {
    return {
        type: actionType.START_FETCH_LOGIN
    }
}

const successLogin = payload => {
    return {
        type: actionType.FETCH_LOGIN_SUCCESS,
        payload
    }
}

const failLogin = () => {
    window.localStorage.removeItem('authToken')
    window.sessionStorage.removeItem('authToken')
    window.localStorage.removeItem('userInfo')
    window.sessionStorage.removeItem('userInfo')
    return {
        type: actionType.FETCH_LOGIN_FAIL
    }
}

export const login = userInfo => async dispatch => {
    const { remember, ...data } = userInfo
    dispatch(startLogin())
    const res = await fetchLogin(data)
    if (res.code !== 200) {
        return dispatch(failLogin())
    }
    const { authToken, ...result } = res.result
    dispatch(successLogin(result))
    if(remember === true) {
        window.localStorage.setItem('authToken', authToken)
        window.localStorage.setItem('userInfo', JSON.stringify(result))
    } else {
        window.sessionStorage.setItem('authToken', authToken)
        window.sessionStorage.setItem('userInfo', JSON.stringify(result))
    }
    message.success('登录成功')
}

export const logout = () => dispatch => {
    dispatch(failLogin())
}