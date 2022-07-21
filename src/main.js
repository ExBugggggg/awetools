import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = 'Awesome Tools-' + to.meta.title
    }
    next()
})

createApp(App).use(router).use(ElementPlus).mount('#app')