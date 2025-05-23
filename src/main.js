import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import TheMask from 'vue-the-mask'


createApp(App).use(store).use(router).use(TheMask).mount('#app')
