import Goods from './components/goods/goods.vue';
import Evaluate from './components/evaluate/evaluate.vue';
import Seller from './components/seller/seller.vue';

export default {
  routes: [
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/evaluate',
      component: Evaluate
    },
    {
      path: '/seller',
      component: Seller
    },
    {
      path: '*',
      component: Goods
    }
  ]
};
