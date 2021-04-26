import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: {name: 'index'},
        },
        {
            name: 'index',
            path: '/index',
            component: () => import('@/views/index')
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/user/login')
        },
        {
            name: 'register',
            path: '/register',
            component: () => import('@/views/user/register')
        },
        {
            name: 'personal',
            path: '/personal/:id',
            component: () => import('@/views/user/personal')
        },
        {
            name: 'edit_profile',
            path: '/edit_profile/:id',
            component: () => import('@/views/user/edit_profile')
        },
        {
            name: 'postDetail',
            path: '/postDetail/:id',
            component: () => import('@/views/post/postDetail')
        },
        {
            name: 'myfollow',
            path: '/myfollow',
            component: () => import('@/views/user/myfollow')
        },
        {
            name: 'mystar',
            path: '/mystar',
            component: () => import('@/views/user/mystar')
        }
    ]
})

import {Toast} from "vant";
// 导航守卫
router.beforeEach((to, from, next) => {
    // console.log(to)
    if (to.path.indexOf('/personal/') !== -1) {
        // 验证是否登录
        let token = localStorage.getItem('token')
        if (token) {
            next()
        } else {
            Toast('未登录，请先登录')
            next({name: 'login'})
        }
    } else {
        next()
    }
    next()
})

export default router