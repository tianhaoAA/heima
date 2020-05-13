/***
 * 封装请求工具 request.js
 * 对于 axios的二次封装
 * 配置拦截器 以及封装
 *
 **/
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截器

axios.interceptors.request.use(function (config) {
  // 成功是执行 第一个 参数 会有一个 config config 是所有配置信息
  const token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
// 失败时执行第二个 axios 是支持promise  失败了 我们应该直接reject会直接进入到axios的catch中
  return Promise.reject(error)
})

// 相应拦截器
axios.interceptors.response.use(function (response) {
//  成功的时候执行 回调函数第一个参数 是1响应体
  // 在拦截器中 需要将数据返回
  return response.data ? response.data : {}
}, function () {
// 失败的时候执行
})
export default axios
