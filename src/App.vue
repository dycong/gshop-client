<template>
  <div>
    <router-view/>
    <Footer v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import Footer from './components/Footer/Footer.vue'

  export default {
    components: {
      Footer
    }
  }
</script>

<style>

</style>
