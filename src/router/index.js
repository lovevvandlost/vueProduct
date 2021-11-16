/*
 * @Description: 
 * @Author:  
 * @Date: 2021-10-30 10:03:52
 * @LastEditTime: 2021-11-04 19:45:13
 * @LastEditors:  
 */
import Cate from '@/components/Goods/Cate'
import Add from '@/components/Goods/Children/Add'
import List from '@/components/Goods/List'
import Params from '@/components/Goods/Params'
import Home from '@/components/Home/Home'
import Login from '@/components/Login/Login'
import Order from '@/components/Order/Order'
import Rights from '@/components/Power/Rights'
import Roles from '@/components/Power/Roles'
import Report from '@/components/Report/Report'
import Users from '@/components/User/Users'
import Welcome from '@/components/Welcome/Welcome'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    component: Login
},
{
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
      path: '/welcome',
      component: Welcome
    },
    {
      path: '/users',
      component: Users
    },
    {
      path: '/rights',
      component: Rights
    },
    {
      path: '/roles',
      component: Roles
    },
    {
      path: '/categories',
      component: Cate
    },
    {
      path: '/goods',
      component: List
    },
    {
      path: '/params',
      component: Params
    },
    {
      path: '/goods/add',
      component: Add
    },
    {
      path: '/orders',
      component: Order
    },
    {
      path: '/reports',
      component: Report
    }    
  ]
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from代表从哪个路径跳转而来
  // next是一个函数，表示放行
  //  next() next('/login') 强制跳转
  if(to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})

export default router
