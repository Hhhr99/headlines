import Vue from 'vue'
import App from './App.vue'


import reset from './styles/reset.less'
import router from './router/index'

import {Toast, Icon} from "vant";

Vue.use(Toast)
    .use(Icon);

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
