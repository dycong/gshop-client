<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item" :class="starClass" v-for="(starClass, index) in starClasses" :key="index"></span>
  </div>
</template>

<script>
  export default {
    props: {
      size:Number, // 星星大小
      score:Number // 评分
    },

    computed: {
      // 包含所有on、half、off 的数组
      starClasses() {
        const {score} = this  // 取出评分
        const arr = [] // 创建一个星星新数组
        const scoreInterge = Math.floor(score)

        // 判断全星数量
        for (let i = 0; i < scoreInterge; i++) {
          arr.push('on')
        }
        // 判断半星个数
        if(score*10 - scoreInterge*10 >= 5){
          arr.push('half')
        }
        // 判断空星的个数
        while (arr.length < 5){
          arr.push('off')
        }

        return arr
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .star //2x图 3x图
    float left
    font-size 0

    .star-item
      display inline-block
      background-repeat no-repeat

    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px

        &:last-child
          margin-right: 0

        &.on
          bg-image('./images/stars/star48_on')

        &.half
          bg-image('./images/stars/star48_half')

        &.off
          bg-image('./images/stars/star48_off')

    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px

        &:last-child
          margin-right 0

        &.on
          bg-image('./images/stars/star36_on')

        &.half
          bg-image('./images/stars/star36_half')

        &.off
          bg-image('./images/stars/star36_off')

    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px

        &:last-child
          margin-right 0

        &.on
          bg-image('./images/stars/star24_on')

        &.half
          bg-image('./images/stars/star24_half')

        &.off
          bg-image('./images/stars/star24_off')

</style>
