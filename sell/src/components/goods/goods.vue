<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <!-- 当currentIndex与index相等的时候，设置高亮 -->
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]">

            </span> {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <!-- food-list-hook用于dom操作，获取整体容器的高度 -->
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>

    </div>
    <v-shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ></v-shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';

  const ERR_OK = 0;
  export default {
    props: {// 接收父组件传的数据
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [], // 菜单中一个菜单栏目的高度
        scrollY: 0// 定义的Y滚动轴以及初始值——实时获取右侧的Y值
      };
    },
    computed: {// 计算属性
      currentIndex() { // 当前菜单栏在整个菜单中的下标index
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) { // 根据当前滚动轴的位置得出index如果第二个栏目不存在那么第一个栏目是最后一个或者当前栏目高度大于等于第一个并且当前滚动轴小于第二个栏目高度；
            return i;// 如果满足则返回index
          }
        }
        return 0;// 初始值为0
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'decrease', 'guarantee'];
    },
    mounted() {
  //            get请求准备好的json数据
      this.$http.get('/api/goods')
        .then(res => {
          res = res.body;
          if (res.errno === ERR_OK) {
            this.goods = res.data;
            // this.$nextTick( ()=> {} )是用来判断dom结构是否完全加载完成
            this.$nextTick(() => {
              this._initScroll();// 对左右两侧的dom结构进行初始化——该方法必须在dom结构加载完成之后调用才生效，所以要写在这个方法里面
              this._calculateHeight();
            });
          };
        });
    },
    methods: {
      selectMenu(index, event) {
        //      自己默认派发事件时候(BScroll),_constructed被置为true,但是浏览器原生并没有这个属性
        // 解决PC端点击左侧会触发两次点击事件，由于PC端没有这个属性，所以不执行这个逻辑，可以避免这个bug发生；
        if (!event._constructed) {
          return;
        }
        // 运用BScroll接口，滚动到相应位置
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        // 获取对应元素的列表
        let el = foodList[index];
        // 设置滚动时间
        this.foodScroll.scrollToElement(el, 300);
        console.group(index, event);
      },
      _initScroll() {
        // this.$refs.menuwrapper获取到dom结构
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          // click： true属性用来设置可以进行点击事件
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          probeType: 3
        });
        // 该方法的作用就是实时滚动的时候把获取到的位置给暴露出来
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY =Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() { // 获取右侧整个区间高度数组
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        // 把第一个高度送入数组
        this.listHeight.push(height);
        // 通过循环foodList下的dom结构，将每一个li的高度依次送入数组
        for (let i=0; i<foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    components: {
      'v-shopcart': shopcart
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
    .goods
      display: flex;
      position: absolute;
      top:176px;
      bottom: 46px;
      width: 100%;
      overflow: hidden;
      .menu-wrapper
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
        .menu-item
          display: table;
          line-height: 14px;
          height: 54px;
          width: 56px;
          padding: 0 12px;
          &.current
            position: relative;
            margin-top: -1px;
            z-index:10;
            background: #fff;
            font-weight: 700;
            .text
              border-none();
          .icon
            display: inline-block;
            width: 12px;
            height: 12px;
            vertical-align: top;
            margin-right: 2px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease
              bg-image('decrease_3');
            &.discount
              bg-image('discount_3');
            &.guarantee
              bg-image('guarantee_3');
            &.invoice
              bg-image('invoice_3');
            &.special
              bg-image('special_3');

          .text
            display: table-cell;
            width: 56px;
            vertical-align: middle;
            border-1px(rgba(7,17,27,0.1));
            font-size: 12px;

      .foods-wrapper
        flex: 1;
        .title
          padding-left: 14px;
          height: 26px;
          line-height: 26px;
          border-left: 2px solid #d9ddee;
          font-size: 12px;
          color: rgb(147,153,159);
          background: #f3f5f7;
        .food-item
          display: flex;
          margin: 18px;
          padding-bottom: 18px;
          border-1px(rgba(7,17,27,0.1));
          &:last-child
            border-none();
            margin-bottom: 0;
          .icon
            flex: 00 57px;
            margin-right: 10px;
          .content
            flex: 1;
            .name
              margin: 2px 0 8px 0;
              height: 14px;
              line-height: 14px;
              font-size: 14px;
              color: rgb(7,17,27);
            .desc,.extra
              line-height: 10px;
              font-size: 10px;
              color: rgb(147,153,159);
            .desc
              margin-bottom: 8px;
            .extra
              &.count
                margin-right: 12px;
            .price
              font-weight: 700;
              line-height: 24px;
              .now
                margin-right: 8px;
                font-size: 14px;
                color:rgb(240,20,20);
              .old
                text-decoration: line-through;
                font-size: 10px;
                color: rgb(7,17,27);

</style>

