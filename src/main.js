import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { IsMobile } from '@assets/common'

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = 'Awesome Tools-' + to.meta.title
    }
    if (IsMobile() && to.name !== 'mobile') {
        next({ name: 'mobile' })
    } else next()
})

createApp(App).use(router).use(ElementPlus).mount('#app')