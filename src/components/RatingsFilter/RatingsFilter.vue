<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block" :class="{active:selectType===2}" @click="setSelectType(2)">
        全部<span class="count">{{totalRatings}}</span>
      </span>
      <span class="block" :class="{active:selectType===0}" @click="setSelectType(0)">
        好评<span class="count">{{totalUpRatings}}</span>
      </span>
      <span class="block" :class="{active:selectType===1}" @click="setSelectType(1)">
        差评<span class="count">{{totalRatings - totalUpRatings}}</span>
      </span>
    </div>
    <div class="switch" :class="{on:onlyText}" @click="toggleText">
      <span class="iconfont icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
  <!--
    定义计算属性totalRatings totalUpRatings，求出全部评价数，好评数，差评数，
    mapGetters显示计算属性
    动态添加类名：根据选择的评价类型 selectType
                  根据切换评价是否带文本 onlyText
  -->
</template>


<script>
  import {mapGetters} from 'vuex'

  export default {
    props: {
      selectType: Number,
      onlyText: Boolean,
      setSelectType: Function,
      toggleText: Function
    },

    computed: {
      ...mapGetters(['totalRatings', 'totalUpRatings']),
    },

    methods: {
      // setSelectType  (selectType)  {
      //   this.$emit('setSelectType', selectType)
      // },
      // //
      // toggleText() {
      //   this.$emit('toggleText')
      // }
    },
    // 设置选择评价的类型
    setSelectType(selectType) {
      this.selectType = selectType
    },
    // 切换为是否内容的评价
    toggleText() {
      this.onlyText = !this.onlyText
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0

      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)

        &.active
          background: $green
          color: #fff

        .count
          margin-left: 2px
          font-size: 8px

    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0

      &.on
        .icon-check_circle
          color: $green

      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px

      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>


