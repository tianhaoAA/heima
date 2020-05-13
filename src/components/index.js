// 需要使用 Vue.use 的方式 去注册
// Vue.use 会调用 对象中的 install方法
import LayoutHeader from '@/views/home/layot-header.vue'
import LayoutAside from '@/views/home/layot-aside.vue'
export default {
  install: function (Vue) {
    //  注册全局 组件 vue
    Vue.component('layout-aside', LayoutAside)
    Vue.component('layout-header', LayoutHeader)
  }
}
