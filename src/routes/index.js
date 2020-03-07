import {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit,
    Notification
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
        component: Dashboard,
        title: '仪表盘',
        isNav: true
    },
    {
        path: '/admin/article',
        component: ArticleList,
        exact: true,
        title: '文章列表',
        isNav: true
    },
    {
        path: '/admin/article/edit/:id',
        component: ArticleEdit
    },
    {
        path: '/admin/settings',
        component: Settings,
        title: '设置',
        isNav: true
    },
    {
        path: '/admin/notification',
        component: Notification
    }
]