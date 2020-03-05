import { request } from '../utils'

export const getArticleList = () => request.post('/api/v1/articlelist')

export const deleteByIdArticle = id => request.post(`/api/v1/articlelist/delete/${id}`)

export const getArticleById = id => request.post(`/api/v1/article/${id}`)

export const getArticleEditById = (id, data) => request.post(`/api/v1/articleEdit/${id}`, data)