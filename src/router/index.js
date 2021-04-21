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
            path: '/personal',
            component: () => import('@/views/user/personal')
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next()
    } else {
        let token = localStorage.getItem('token')
        if (token) {
            next()
        } else {
            next({name: 'login'})
        }
    }
})

export default router