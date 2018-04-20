// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import http from './utils/http'

import alertBox from './utils/alert'
import common from './utils/common'
import message from '../static/css/messagebox.css'
Vue.config.productionTip = false

Vue.prototype.$ajax='axios'

Vue.use(http); //变成全局组件
//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
//
axios.interceptors.request.use(function (config) {  //配置发送请求的信息
  //stores.dispatch('showLoading')
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
                                                      //stores.dispatch('hideLoading')
  return response;
}, function (error) {

  return Promise.reject(error);
});

Vue.prototype.$http = axios  //其他页面在使用axios的时候直接  this.$http就可以了
Vue.prototype.http = http
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
