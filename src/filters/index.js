/*
自定义过滤器模块
 */
import Vue from 'vue'
import moment from "moment";

//自定义一个日期格式化过滤器
Vue.filter('data-format', function (value, formatStr) {
  return moment(value).format(formatStr || 'YYYY-MM-DD HH:mm:ss')
})
