import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HttpTemp from '@/components/HttpTemp'
import ScrollList from '@/components/ScrollList'
import Head from '@/components/header/head'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/HttpTemp',
      name: 'HttpTemp',
      component: HttpTemp
    },
    {
      path: '/ScrollList',
      name: 'ScrollList',
      component: ScrollList
    },
    {
      path: '/Header',
      name: 'Head',
      component: Head
    }
  ]
})
