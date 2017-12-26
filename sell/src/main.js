import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import route from './route';
import 'animate.css';
import 'common/stylus/index.styl';
//  使用编译router
Vue.use(VueRouter);
Vue.use(VueResource);

var router = new VueRouter(route);

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
});

