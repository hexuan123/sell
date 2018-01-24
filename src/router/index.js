import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Goods from '@/view/Goods'
import Ratings from '@/view/Ratings'
import Seller from '@/view/Seller'


Vue.use(Router)

export default new Router({
  model:history,
  routes: [
    {
    	path: '/goods',
    	name: 'Goods',
    	component: Goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    }
  ]
})
