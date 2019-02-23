<template>
  <header class="header">
    <slot name="left"></slot>
    <span class="header_title">
      <span class="header_title_text ellipsis">{{title}}</span>
    </span>
    <slot name="right"></slot>
  </header>

</template>

<script>
  export default {
    props: {
      title: String
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  //头部公共css
  .header
    width 100%
    height 45px
    position fixed
    z-index 100
    top 0
    left 0
    background-color #02a774

    .header_search
      width 10%
      height 50%
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)

      .icon-sousuo
        font-size 25px
        color #fff

    .header_title
      width 50%
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      color #fff
      text-align center

      .header_title_text
        font-size 20px
        color #fff
        display block

    .header_login
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)
      font-size 14px
      color #fff

      .header_login_text
        color #fff

</style>
