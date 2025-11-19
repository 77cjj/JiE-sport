

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css"

import App from './App.vue'

// 创建 Pinia 实例
const pinia = createPinia()

// 创建 Vue 应用实例并挂载插件
createApp(App)
  .use(pinia)
  .use(router)
  .use(ElementPlus)
  .mount('#app')