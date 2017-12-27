<template>
  <div class="cartcontrol">
    <!--<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart"></div>-->
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
          <i class="inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          // 通过Vue的set方法为food添加一个count属性，并赋值为1；
          Vue.set(this.food, 'count', 1);
//          this.food.count = 1;
        } else {
          this.food.count ++;
        }
        // 去派发一个事件通过$dispatch这个方法
        this.$emit('cart.add', event.target);
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count --;
        }
      }
    }
  };

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0;
    .cart-decrease
      display: inline-block
      padding: 6px;
      font-size: 0;
      opacity: 1;  // 整体进入后透明度为1
      color: rgb(0,160,220);
      .inner
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
        transition: all 0.8s ease;
        transform: rotate(0) // icon进入角度为0
    .move-enter-active,.move-leave-active// 小球进入，和离开过程的样式，transition: all .8s ease  只能应用到div.decrease上，不能继承到i.icon,所以需要另外在i.icon上写transition: all .8s ease
      transition: all .8s ease;
    .move-enter,.move-leave-to
      opacity: 0;   // 进入前和离开后整体的透明度
      transform: translate3d(24px, 0, 0);
      .inner
        transform: rotate(180deg);// 进入前和离开后icon的旋转角度
    .cart-count
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147,153,159);
    .cart-add
      display: inline-block;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0,160,220);
      padding: 6px;
</style>
