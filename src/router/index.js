import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        name: 'home',
        meta: {
            title: 'Home'
        },
        component: () => import('@views/HomeView.vue')
    }, {
        path: '/json',
        name: 'json',
        meta: {
            title: 'JSON Formatter'
        },
        component: () => import('@views/JsonView.vue')
    }, {
        path: '/regex',
        name: 'regex',
        meta: {
            title: 'Regex'
        },
        component: () => import('@views/RegexView.vue')
    }, {
        path: '/encode',
        name: 'encode',
        meta: {
            title: 'Encode and Decode'
        },
        component: () => import('@views/EncodeView.vue')
    }, {
        path: '/framework',
        name: 'framework',
        meta: {
            title: 'Framework URL'
        },
        component: () => import('@views/FrameworkView.vue')
    }, {
        path: '/encrypt',
        name: 'encrypt',
        meta: {
            title: 'Encrypt and Decrypt'
        },
        component: () => import('@views/EncryptView.vue')
    }, {
        path: '/manual',
        name: 'manual',
        meta: {
            title: 'Help and Manual'
        },
        component: () => import('@views/ManualView.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router