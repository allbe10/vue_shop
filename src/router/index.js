import Vue from 'vue'
import VueRouter from 'vue-router'
import shoppingMall from '@/components/pages/shoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Center from '@/components/pages/Center'
import Main from '@/components/pages/Main'


Vue.use(VueRouter)
 

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path:'/main',name:'Main',component:Main,
      children:[
        {path:'/',name:'shoppingMall',component:shoppingMall},
        {path:'/categoryList',name:'CategoryList',component:CategoryList},
        {path:'/cart',name:'Cart',component:Cart},
        {path:'/center',name:'Center',component:Center},
      ]
    },
    {path:'/register',name:'Register',component:Register},
    {path:'/login',name:'Login',component:Login},
    {path:'/goods',name:'Goods',component:Goods}, 
  ]
})

export default router
