/*
 * @Description: 
 * @Author:  
 * @Date: 2021-10-30 10:03:52
 * @LastEditTime: 2021-11-04 19:14:01
 * @LastEditors:  
 */
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import TreeTable from 'vue-table-with-tree-grid'
import App from './App.vue'
// 引入全局样式表
import './assets/css/global.css'
// 引入reset.css
import './assets/css/reset.css'
// 引入字体图标
import './assets/font/iconfont.css'
// 引入插件
import './plugins/element.js'
import router from './router'
import store from './store'
// 导入富文本编辑器

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme


// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)
Vue.use(VueQuillEditor)

// 全局时间过滤器
Vue.filter('dataFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // yyyy-mm-dd hh:mm:ss
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
