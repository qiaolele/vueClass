<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{ totalCount }}</div>
          </div>
          <div class="price" :class="{'highlight': totalPrice>0}">￥{{ totalPrice }}元</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
          <div class="pay" :class="payClass">{{ payDesc }}</div>
      </div>
    </div>
    <div class="ball_container">
      <transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-for="(ball,index) in balls" :key="index" v-show="ball.show">
          <span class="inner inner_hook icon-remove_circle_outline"></span>
        </div>
      </transition-group>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
    export default {
      props: {
        // 选择商品的数组
        selectFoods: {
          type: Array,
          default() {
            return [
              {
                price: 20,
                count: 1
              }
            ];
          }
        },
        deliveryPrice: {
          type: Number,
          default: 0
        },
        minPrice: {
          type: Number,
          default: 0
        }
      },
      data() {
        return {
          balls: [
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            }
          ],
          dropBalls: []
        };
      },
      computed: {
        // 总价钱
        totalPrice() {
          let total = 0;
          this.selectFoods.forEach((food) => {
            total += food.price * food.count;
          });
          return total;
        },
        // 选择商品的总和
        totalCount() {
          let count = 0;
          this.selectFoods.forEach((food) => {
            count += food.count;
          });
          return count;
        },
        payDesc() {
          // 总价格为0的时候，就显示最低起送价
          if (this.totalPrice === 0 ) {
            return `￥${this.minPrice}元起送`;
          } else if (this.totalPrice < this.minPrice) {
            let diff = this.minPrice - this.totalPrice;
            return `还差￥${diff}元起送`;
          } else {
            return '去结算';
          }
        },
        payClass() {
          if (this.totalPrice < this.minPrice) {
            return 'not-enough';
          } else {
            return 'enough';
          }
        }
      },
      methods: {
        drop(ele) {
          // console.log(ele);// 获取到点击的那个添加按钮
          for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i];
            if (!ball.show) {
              ball.show = true; // 表示可以有下落动画
              ball.el = ele;
              this.dropBalls.push(ball);
              return; // 跳出循环
            }
          }
        },
        beforeEnter(ele) { // 下落小球的下落之前的运动函数钩子
          let len = this.balls.length;
          while (len--) {
            let ball = this.balls[len];
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect(); // 小球盒模型
              let x = rect.left - 32; // 小球距离购物车图标的位置
              let y = -(window.innerHeight - rect.top - 22);
              ele.style.display = '';
              ele.style.webkitTransform = `translate3d(0,${y}px,0)`;
              ele.style.transform = `translate3d(0,${y}px,0)`;
              let inner = ele.getElementsByClassName('inner_hook')[0];
              inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
              inner.style.transform = `translate3d(${x}px,0,0)`;
            }
          }
        },
        enter(ele) { // 下落小球的下落时的运动函数钩子
          ele.offsetHeight; // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
          this.$nextTick(() => { // 改回运动初始状态
            ele.style.webkitTransform = 'translate3d(0, 0, 0)';
            ele.style.transform = 'translate3d(0,0,0)';
            let inner = ele.getElementsByClassName('inner_hook')[0];
            inner.style.webkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
          });
        },
        afterEnter(ele) { // 下落小球的下落之后的运动函数钩子
          let ball = this.dropBalls.shift();
          if (ball) {
            ball.show = false;
            ele.style.display = 'none';
          }
        }
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .shopcart
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 50;
      width: 100%;
      height: 48px;
      .content
        background: #141d27;
        display: flex;
        font-size: 0;
        color: rgba(255,255,255,0.4);
        .content-left
          flex: 1;
          .logo-wrapper
            display: inline-block;
            vertical-align: top;
            position: relative;
            top: -10px;
            margin: 0 12px;
            padding: 6px;
            width: 56px;
            height: 56px;
            box-sizing: border-box;
            border-radius: 50%;
            background: #141d27;
            .logo
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: #2b343c;
              &.highlight
                background: rgb(0,160,220);
              .icon-shopping_cart
                font-size: 24px;
                color: #80858a;
                line-height: 44px;
                display: block;
                text-align: center;
                &.highlight
                  color: #fff;
          .num
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700px;
            color: #fff;
            background: rgb(240,20,20);
            box-shadow:0 4px 8px 0 rgba(0,0,0,0.4);
          .price
            display: inline-block;
            vertical-align: top;
            margin-top: 12px;
            line-height: 24px;
            box-sizing: border-box;
            padding-right: 12px;
            border-right: 1px solid rgba(255,255,255,0.1);
            font-size: 16px;
            font-weight: 700px;
            &.highlight
              color: #fff;
          .desc
            display: inline-block;
            vertical-align: top;
            margin: 12px 0 0 12px;
            line-height: 24px;
            font-size: 10px;
            font-weight: 700px;
        .content-right
          width: 105px;
          flex: 0 0 105px;
          .pay
            font-size: 12px;
            height: 48px;
            line-height: 48px;
            text-align: center;
            font-weight: 700px;
            background: #2b333b;
            &.not-enough
              background: #2b333b;
            &.enough
              background: #00b43c;
              color: #fff;

      .ball_container
        .ball
          position:fixed
          left:32px
          bottom:22px
          color:#fff
          &.drop-enter,&.drop-enter-active
            transition all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
            .inner
              display:inline-block
              width:16px
              height:16px
              border-radius:50%
              background:rgb(0,160,220)
              transition:all 0.4s linear
</style>
