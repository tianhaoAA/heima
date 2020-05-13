/**
 *
 * 专门处理权限的问题
 *
 * **/

import router from '@/router'

router.beforeEach(function (to, from, next) {
  // to 表示 你要到哪里去 是一个路由信息对象
  // from 表示 你从哪里来 是一个路由对象
  // next 是一个必须执行的函数 相当于 resolve ,如果不执行。就会报错
  // next() 没有Cass的情况下 表示直接放过 一切ok
  // next(false) 表示 你当前的跳转 被停止了 你不能跳
  // next(新地址) 表示改变原来的轨迹 去新的地方
  // next()
  // 首先应该判断 你 需要拦截那些页面  如果页面的地址 以/home为开头，就需要进行token 的判断
  // 判断你要去的页面是不是以 /home 为开头
  if (to.path.startsWith('/home')) {
    // 表示你要去主页相关的页面
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
