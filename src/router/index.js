import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Home from '../views/home'
import login from '../views/login'
import SecondHome from '../views/home/second-home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        // path 什么都不写 代表二级路由的默认组件
        path: '',
        component: SecondHome
      }, {
        path: 'comment',
        // 按需加载
        component: () => import('@/views/comment')
      },
      {
        path: 'marerial',
        component: () => import('@/views/material')
      },
      {
        path: 'publish',
        component: () => import('@/views/aricles')
      }
    ]
  },
  {
    path: '/login',
    component: login
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
