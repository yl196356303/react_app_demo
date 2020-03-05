import axios from 'axios'
import {
    message
} from 'antd'

const isDev = process.env.NODE_ENV === 'development'

// 不带全局loading的请求实例
export const requestWithoutLoading = createBaseInstance()

// 带全局loading的请求实例
// 传入函数是因为需要在处理请求结果handleResponse之前处理loading
// 所以要在内部插入loading拦截器的处理逻辑
export const request = createBaseInstance()
mixinLoading(request.interceptors)

// 通用的 axios 实例
function createBaseInstance() {
    const instance = axios.create({
        baseURL: isDev ? 'http://rap2.taobao.org:38080/app/mock/246011' : ''
    })

    instance.interceptors.response.use(handleResponse, handleError)
    return instance
}

function handleResponse(response) {
    return response.data
}

function handleError(e) {
    message.error('出错啦~')
    throw e
}

let loading
let loadingCount = 0

function mixinLoading(instance) {
    instance.request.use(loadingRequestInterceptor)
    instance.response.use(loadingResponseInterceptor, loadingResponseErrorInterceptor)

    function loadingRequestInterceptor(config) {
        if (!loading) {
            // 创建 loading
        }
        config.data = Object.assign({}, config.data, {
            authToken: 'dsadsadsylyykyl23'
        })
        loadingCount++
        return config
    }

    function handleResponseLoading() {
        loadingCount--
        if (loadingCount === 0) {
            loading = null
        }
    }

    function loadingResponseInterceptor(response) {
        handleResponseLoading()
        return response
    }

    function loadingResponseErrorInterceptor(e) {
        handleResponseLoading()
        throw e
    }
}