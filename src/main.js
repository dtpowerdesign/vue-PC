// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Axios from 'axios'
import qs from 'querystring'
import 'element-ui/lib/theme-chalk/index.css'
import domain from './domain.js'
import cookie from 'vue-cookie'
import check from './util/check'
import formDate from './util/formDate'
Vue.use(cookie)
Vue.prototype.$domain = domain
Vue.prototype.cookie = cookie
Vue.prototype.$check = check
Vue.prototype.$formDate = formDate
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = Axios
Vue.prototype.$qs = qs
  /* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
