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
        path: '/home',
        name: 'Home',
        component: () =>
            import ('../views/Home.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router