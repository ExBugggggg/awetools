import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        name: 'home',
        component: () => import('@views/HomeView.vue')
    }, {
        path: '/json',
        name: 'json',
        component: () => import('@views/JsonView.vue')
    }, {
        path: '/regex',
        name: 'regex',
        component: () => import('@views/RegexView.vue')
    }, {
        path: '/encode',
        name: 'encode',
        component: () => import('@views/EncodeView.vue')
    }, {
        path: '/framework',
        name: 'framework',
        component: () => import('@views/FrameworkView.vue')
    }, {
        path: '/encrypt',
        name: 'encrypt',
        component: () => import('@views/EncryptView.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router