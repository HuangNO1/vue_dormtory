import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/sign' },
    {
        path: '/sign',
        name: 'Sign',
        component: () =>
            import ('../views/Sign.vue'),
        children: [{
                path: '/sign/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/sign/register',
                name: 'Register',
                component: Register
            }
        ],
        redirect: '/sign/login'
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () =>
            import ('../views/Admin.vue'),
        children: [{
                path: '/admin/dashboard',
                name: 'Dashboard',
                component: () =>
                    import ('../views/Dashboard.vue'),
            },
            {
                path: '/admin/notify',
                name: 'Notify',
                component: () =>
                    import ('../views/Notify.vue'),
            },
            {
                path: '/admin/user',
                name: 'User',
                component: () =>
                    import ('../views/User.vue'),
            }
        ],
        redirect: '/admin/dashboard'
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router