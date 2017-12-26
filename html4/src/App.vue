<template>
    <div>
        <h1>{{ msg }}</h1>
        <navs></navs>
    </div>
</template>


<style>
    div{
        background: #eee;
    }
</style>

<script>
    //导入home组件通过import
    import Home from './components/Home.vue';
    import Navs from './components/Navs.vue';
    export default {
        data(){
            return {msg:'hello，app页面圆明园'}
        },
        components:{Home,Navs},
        mounted(){
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
            this.$http.get('https://api.github.com/users/yuanmengyuan')
                .then(res => {
                    console.log(res);
                })


        }
    }

</script>