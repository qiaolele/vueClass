<template>
    <div>
        <h1>{{ msg }}页面</h1>
        <p>我是用less设置的样式</p>
        <le-button>这是home的按钮</le-button>
    </div>
</template>

<!--支持less语法-->
<style scoped lang="less" rel="stylesheet/less">
    div{
        background: #009999;
        p{
            background:green;
            height: 40px;
            line-height: 40px;
            color: #ffffff;
            position:relative;
            &::after{
                position:absolute;
                content:"";
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background:pink;
            }
        }
    }
</style>

<script>
    export default{
        data(){
            return {msg:'home'}
        }
    }

</script>