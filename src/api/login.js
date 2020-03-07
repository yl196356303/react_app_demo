import { requestWithoutLoading } from '../utils'

export const fetchLogin = userInfo => requestWithoutLoading.post('/api/v1/login', userInfo)