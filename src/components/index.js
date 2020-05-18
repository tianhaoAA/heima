// 需要使用 Vue.use 的方式 去注册
// Vue.use 会调用 对象中的 install方法
import LayoutHeader from '@/views/home/layot-header.vue'
import LayoutAside from '@/views/home/layot-aside.vue'
import BreadCrumb from './common/bread-crumb.vue'
import VueQuillEditor from 'vue-quill-editor'
import CoverImage from './publish'
import SelectImages from './publish/select-images'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install: function (Vue) {
    //  注册全局 组件 vue
    Vue.component('layout-aside', LayoutAside)
    Vue.component('layout-header', LayoutHeader)
    Vue.component('bread-crumb', BreadCrumb)
    Vue.component('cover-image', CoverImage)
    Vue.component('select-images', SelectImages)
    // 注册 富文本编辑器
    Vue.use(VueQuillEditor)
  }
}
