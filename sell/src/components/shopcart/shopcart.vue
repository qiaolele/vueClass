<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo">
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="num">{{ totalCount }}</div>
          </div>
          <div class="price">￥{{ totalPrice }}元</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
          <div class="pay">￥{{ minPrice }} 元起送</div>
      </div>
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
                price: 10,
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
              .icon-shopping_cart
                font-size: 24px;
                color: #80858a;
                line-height: 44px;
                display: block;
                text-align: center
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
            font-size: 24px;
            height: 48px;
            line-height: 48px;
            text-align: center;
            font-weight: 700px;
            background: #2b333b;

</style>
