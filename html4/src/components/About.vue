<template>
    <div>
        <h1>about页面</h1>
        <button @click="bok = !bok">点击显示隐藏</button>
        <!--<transition name="fade">-->
            <!--<h2 v-show="bok">你能看见我？</h2>-->
        <!--</transition>-->

        <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <h2 v-show="bok">你能看见我？</h2>
        </transition>
    </div>
</template>

<style>
    /*.fade-enter{*/
        /*opacity:0;*/
    /*}*/
    /*.fade-enter-active,.fade-leave-active{*/
        /*transition:all 1s;*/
        /*opacity: 1;*/
    /*}*/
    /*.fade-enter,.fade-leave-to{*/
        /*transition:all 1s;*/
        /*opacity:0;*/
    /*}*/

</style>

<script>
    export default {
        data(){
            return {bok:true}
        }
    }

</script>