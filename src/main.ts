import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createI18n } from 'vue-i18n';
import en from "./services/locales/en.json"
import ar from "./services/locales/ar.json"
//@ts-ignore
import i18n from '../i18b';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
//pages
import PageHome from "./pages/PageHome/Page.vue"
import PageAbout from "./pages/PageAbout/Page.vue"
import PageAppearance from "./pages/PageAppearance/Page.vue"
import PageHowUse from "./pages/PageHowUse/Page.vue"

const routes = [
  { path: '/', component: PageHome },
  { path: '/about', component: PageAbout },
  { path: '/how-to-use', component: PageHowUse },
  { path: '/appearance', component: PageAppearance },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  
const i18n = createI18n({
    legacy: false, 
    locale: 'en', 
    fallbackLocale: 'en',
    messages: {
        en,
        ar
    },
  })

const app = createApp(App)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(i18n)
app.use(router)
app.mount('#app')