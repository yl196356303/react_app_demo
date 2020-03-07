import {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit,
    Notification,
    NoAuth,
    Profile
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
        isNav: true,
        role: ['001', '002', '003']
    },
    {
        path: '/admin/article',
        component: ArticleList,
        exact: true,
        title: '文章列表',
        isNav: true,
        role: ['001', '002', '003']
    },
    {
        path: '/admin/article/edit/:id',
        component: ArticleEdit,
        role: ['001', '002']
    },
    {
        path: '/admin/settings',
        component: Settings,
        title: '设置',
        isNav: true,
        role: ['001']
    },
    {
        path: '/admin/notification',
        component: Notification,
        role: ['001', '002', '003']
    },
    {
        path: '/admin/noauth',
        component: NoAuth,
        role: ['001', '002', '003']
    },
    {
        path: '/admin/profile',
        component: Profile,
        role: ['001', '002', '003']
    }
]