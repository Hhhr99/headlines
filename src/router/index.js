import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
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
        }
    ]
})

import {Toast} from "vant";
// 导航守卫
router.beforeEach((to, from, next) => {
    console.log(to)
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