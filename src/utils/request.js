/***
 * 封装请求工具 request.js
 * 对于 axios的二次封装
 * 配置拦截器 以及封装
 *
 **/
import axios from 'axios'
import router from '@/router'
import JSONBig from 'json-bigint'
axios.defaults.transformResponse = [function (data) {
  return data ? JSONBig.parse(data) : {}
}]
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
}, function (error) {
// 失败的时候执行
  // error 是错误对象 里面包含了错误的状态码 和相应信息

  if (error.response.status === 401) {
    localStorage.removeItem('user-token')
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios
