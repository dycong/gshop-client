<template>
  <div>
    <router-view/>
    <Footer v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import Footer from './components/Footer/Footer.vue'

  export default {
    async mounted () {
    // 触发vuex的getAddress()，从后台获取address
      this.$store.dispatch('getAddress')
    //  触发vuex的getUser(), 获取用户user，自动登录
      this.$store.dispatch('getUser')

      this.$store.dispatch('getShopInfo')

    },

    components: {
      Footer
    }
  }
</script>

<style>

</style>
