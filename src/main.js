import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import iView from './iview'
import routes from './routes'
import './iview/styles'

import locale from './iview/locale/lang/zh-CN'

Vue.use(VueRouter)
Vue.use(iView, {
    locale
})


// 开启debug模式
Vue.config.debug = true;

const router = new VueRouter({
    routes
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
