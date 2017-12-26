<template>
  <div>
    <p>{{ address }}</p>
    <span>{{ tel }}</span>
    <div> {{ time }}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        address: '北京市西城区新街口北大街1号1号楼5层',
        tel: '21312323',
        time: '配送时间：09:00-21:00'
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    p,span,div
      padding: 10px

</style>

