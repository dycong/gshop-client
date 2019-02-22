/*
路由对象模块
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由数组模块
import routes from './routes'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history', // 去掉路由中的#
  routes // 配置所有路由
})
