<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/evaluate">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        seller: {}
      };
    },
    mounted() {
//            jsonp请求
//            this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',{
//                params:{
//                    wd:'fanyiguan'
//                },
//                jsonp:'cb'
//            }).then(res => {
//                console.log(res.body.s);
//            })

//            get请求
      this.$http.get('/api/seller')
        .then(res => {
          res = res.body;
          if (res.errno === ERR_OK) {
              this.seller = res.data;
            console.group(this.seller);
          };
        });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin.styl'
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex: 1
      text-align: center
      margin-bottom: 40px
      & > router-link
        display: block
        font-size: 14px
        color: rgb(77,85,93)
    .fade-enter
      opacity: 0;
    .fade-enter-active,.fade-leave-active
      transition: all 1s;
      opacity: 1;
    .fade-enter,.fade-leave-to
      transition: all 1s;
      opacity: 0;
    .router-link-active
      color: rgb(240,20,20)
</style>
