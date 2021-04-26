import Vue from 'vue'
import App from './App.vue'


import reset from '@/styles/reset.less'
import router from './router/index'

import {Toast, Icon, Uploader, Dialog, ActionSheet,Field,Tab, Tabs ,List,PullRefresh,SwipeCell,Button  } from "vant";

Vue.use(Toast)
    .use(Icon)
    .use(Uploader)
    .use(Dialog)
    .use(ActionSheet)
    .use(Field )
    .use(Tab )
    .use(Tabs )
    .use(List )
    .use(PullRefresh )
    .use(SwipeCell )
    .use(Button  )

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
