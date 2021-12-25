import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

URLSearchParams.prototype.appendIfExists = function (key, value) {
    if (value !== null && value !== undefined) {
        this.append(key, value)
    }
};

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount('#app');

// createApp(App).use(router).mount('#app');