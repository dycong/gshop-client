/*
入口js
 */

import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import App from './App'
import router from './router'
import store from './store/index'

import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import CartControl from './components/CartControl/CartControl.vue'
import Split from './components/Split/Split.vue'
import Loading from './common/imgs/loading.gif'

import './filters'

import './mock/mockServer'

import {Button} from 'mint-ui';
import 'mint-ui/lib/style.css'


Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.component('Split', Split)
Vue.use(VueLazyload, {
  loading: Loading
})
Vue.component(Button.name, Button)


new Vue({
  el: '#app',
  render: h => h(App),
  router, //配置路由器
  store // 配置vuex
})
