<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-remove_circle_outline" v-if="food.count > 0" @click.stop="updateFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count > 0">{{food.count}}</div>

    <div class="iconfont icon-add_circle" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
  export default {
    props: {
      food: Object
    },

    methods: {
      updateFoodCount(isAdd) {
        const {food} = this
        this.$store.dispatch('updateFoodCount', {isAdd, food})
      }
    }

    /*
    CartControl:
      1、注册成全局组件
      2、从父组件传一个food进来，
      3、判断 - 和 count 是否应该存在
      4、点击 + 或 - 按钮更新count，传入isAdd、food
      5、指定一个action，updateFoodCount，传个对象 {isAdd，food}
      6、在shop里注册2个mutation，Vue.set新建一个count属性
    * */
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0

    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all 0.5s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(10px) rotate(180deg)

    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)

    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>


