/*
入口js
 */

import Vue from 'vue'
import App from './App'
import router from './router'
import Header from './components/Header/Header.vue'  // 全局组件Header
import store from './store/index'
import Star from './components/Star/Star.vue'  //全局组件Star
import './mock/mockServer'

import {Button} from 'mint-ui';
import 'mint-ui/lib/style.css'


Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component(Button.name, Button)


new Vue({
  el: '#app',
  render: h => h(App),
  router, //配置路由器
  store // 配置vuex
})
