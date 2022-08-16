import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { IsMobileAgent } from '@assets/common'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// Router
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = 'Awesome Tools-' + to.meta.title
    }
    if (IsMobileAgent() && to.name !== 'mobile') {
        next({ name: 'mobile' })
    } else next()
})

const app = createApp(App)
// Element Icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router).use(ElementPlus).mount('#app')