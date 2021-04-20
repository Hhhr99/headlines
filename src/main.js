import Vue from 'vue'
import App from './App.vue'

import { Button } from 'vant'
import 'vant/lib/index.css'
Vue.use(Button);

import reset from './styles/reset.less'
import router from './router/index'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
