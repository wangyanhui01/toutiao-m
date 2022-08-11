import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)
const routes = [

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),

  },
  {
    path: '/',
    // name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', //为空 默认子路由 只能有一个
        name: 'home',
        component: () => import('@/views/home'),

      },
      {
        path:'/qa',
        name:'qa',
        component: ()=> import('@/views/qa'),
        
       },
       {
        path:'/video',
        name:'video',
        component: ()=> import('@/views/video'),
        
       },
       {
        path:'/my',
        name:'my',
        component: ()=> import('@/views/my'),
        
       },
    ]

  },

  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),

  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props:true, //开启props传参数就是把路由参数映射到组件中
  },
]

const router = new VueRouter({
  routes
})

export default router