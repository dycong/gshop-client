/*
使用mockjs来mock模拟数据
不需要编码向外暴露任何东西
 */

import Mock from 'mockjs'
import data from './data.json' //js对象内部会自动解析json对象数据

// 提供goods接口
Mock.mock('/goods', {code: 0, data: data.goods})

// 提供ratings接口
Mock.mock('/ratings', {code: 0, data: data.ratings})

// 提供info接口
Mock.mock('/info', {code: 0, data: data.info})

console.log('Mock')
