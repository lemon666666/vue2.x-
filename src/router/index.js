import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'index',
        component: Index
      },
      {
        path: '/product/:id',
        name: 'product',
        component: () => import('../views/Product')
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('../views/Detail')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/Order'),
    children: [
      {
        path: 'list',
        name: 'order-list',
        component: () => import('../views/OrderList.vue')
      },
      {
        path: 'confirm',
        name: 'order-confirm',
        component: () => import('../views/OrderConfirm.vue')
      },
      {
        path: 'pay',
        name: 'order-pay',
        component: () => import('../views/OrderPay.vue')
      },
      {
        path: 'alipay',
        name: 'alipay',
        component: () => import('../views/Alipay.vue')
      }
    ]
  }
]

const router = new VueRouter({
  // 打包生产环境时报错404要生产环境要配置nginx配置
  mode: 'history',
  routes
})

export default router
