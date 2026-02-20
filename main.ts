import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/app/App.vue'
import router from '@/app/providers/router'

import { VueQueryPlugin } from '@tanstack/vue-query'

import '@/app/styles/tailwind.css'
import '@/app/styles/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
