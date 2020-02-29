import {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit
} from '../pages'

export const mainRouter = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/404',
        component: NotFound
    }
]

export const adminRouter = [
    {
        path: '/admin/dashboard',
        component: Dashboard
    },
    {
        path: '/admin/settings',
        component: Settings
    },
    {
        path: '/admin/article',
        component: ArticleList
    },
    {
        path: '/admin/article/edit/:id',
        component: ArticleEdit
    },
]