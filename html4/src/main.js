
//import Vue from 'vue/dist/vue.js';——这样写是可以的，但是有些麻烦
import Vue from 'vue';
import App from './App.vue'
import VueRouter from 'vue-router';
import route from './route';
import leButton from './components/Button';
import VueResource from 'vue-resource';
import axios from 'axios';
import 'animate.css';

Vue.use(VueRouter);//系统提供的方法，可以把这个组件变成全局公用的组件
Vue.use(leButton);
// Vue.use(VueResource);

Vue.prototype.$http = axios;

//1：创建实例，并且引入配置
var router = new VueRouter(route);

//2：把router放入app实例；
var app = new Vue({
    router,
    el:"#app",
    // components:{//问题
    //     App
    // }

    //...App  //扩展运算符   es6里面的
    render:h=>h(App)
})