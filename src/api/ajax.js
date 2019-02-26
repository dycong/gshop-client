/*
能发送ajax请求的函数模块
函数返回值为一个promise对象
1、异步得到的不再是response，而是data（result）
2、对请求错误进行了统一处理，外面使用的不用做进行错误处理
 */
import axios from 'axios'

export default function ajax(url, data = {}, method = 'GET') {
  // 自定义promise
  return new Promise((resolve, reject) => {
    let promise
    if (method === 'GET') {
      promise = axios.get(url, {params: data}) // 指定所有的query参数
    } else {
      promise = axios.post(url, data)
    }
    promise.then(response => {
      // 请求成功，调用resolve
      resolve(response.data)
    }).catch(error => {
      // 请求失败，调用reject
      // reject(error)
      alert('请求出错', error.message)
    })
  })


}

async function login() {
  // ajax('/login', {name: 'haha', age: 18}, 'POST').then(function (response) {
  //   const result = response.data
  // })

  // const response = await ajax('/login', {name: 'haha', age: 18}, 'POST')
  // const result = response.data

  const result = await ajax('/login', {name: 'haha', age: 18}, 'POST')
}
