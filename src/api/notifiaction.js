import { request } from '../utils'

export const getNotifiactionList = () => request.post('/api/v1/notifiactions')