import actionType from '../actions/actionType'
const isLogin = Boolean(window.localStorage.getItem('authToken')) || Boolean(window.sessionStorage.getItem('authToken'))
const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || JSON.parse(window.sessionStorage.getItem('userInfo'))

const initState = () => {
    if (userInfo) {
        return {
            ...userInfo,
            isLogin,
            sloading: false
        }
    } else {
        return {
            id: '',
            displayName: '',
            avatar: '',
            role: '',
            isLogin,
            isloading: false
        }
    }
}

export default (state = initState(), action) => {
    switch (action.type) {
        case actionType.START_FETCH_LOGIN:
            return {
                ...state,
                isloading: true
            }
        case actionType.FETCH_LOGIN_SUCCESS:
            return {
                ...action.payload,
                isLogin: true,
                isloading: false
            }
        case actionType.FETCH_LOGIN_FAIL:
            return initState()
        default:
            return state
    }
}