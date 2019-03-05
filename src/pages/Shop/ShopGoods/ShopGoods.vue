<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
              :class="{current:index === currentIndex}" @click="clickLeft(index)">
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index"  @click="isShowFood(food)">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <!--标签对象就是组件对象-->
    <Food :food="food" ref="food"/>
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

  import Food from '../../../components/Food/Food.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'

  export default {
    data() {
      return {
        scrollY: 0, // 右侧列表向上滑动的距离
        tops: [], //  右侧所有食物li的top组成的数组，在列表显示之后确定值
        food: {},
      }
    },

    mounted() {
      this.$store.dispatch('getGoods', () => {
        this.$nextTick(() => {
          this._initScroll() // 滑动
          this._initTop() // top值
        })
      })
    },

    computed: {
      ...mapState({
        goods: state => state.shop.goods
      }),

      // 当前分类的下标
      currentIndex() {
        const {tops, scrollY} = this
        // 返回得到新的下标
        // scrollY>=top && scrollY<nextTop
        const index = tops.findIndex((top, index) => scrollY >= top && scrollY < tops[index + 1])
        // 如果下标变化，让左侧列表滑动当前分类处，保证当前分类项总是可见的
        // 先判断是否变化了，在保存
        if (this.index != index && this.LeftScroll) {
          // 需要保存index在this组件对象中
          this.index = index
          // 得到index对应的分类项li
          const li = this.$refs.leftUl.children[index]
          // 滑动右侧列表到指定li
          this.LeftScroll.scrollToElement(li, 500)
        }
        return index
      }
    },

    methods: {
      // 初始化滑动
      _initScroll() {
        // 左侧分类列表滑动
        this.LeftScroll = new BScroll('.menu-wrapper', {
          click: true, // 派发点击事件
        })
        // 右侧食物列表滑动
        this.RightScroll = new BScroll('.foods-wrapper', {
          click: true, // 派发click事件
          probeType: 1, // 触摸，非实时派发scroll事件
        })

        // /获取列表高度后，绑定滑动监听

        // 绑定右侧列表滑动的监听
        this.RightScroll.on('scroll', ({x, y}) => {
          console.log('scroll', y)
          this.scrollY = Math.abs(y)
        })
        // 绑定右侧列表滑动结束的监听
        this.RightScroll.on('scrollEnd', ({x, y}) => {
          console.log('scrollEnd', y)
          this.scrollY = Math.abs(y)
        })

      },

      // 获取右侧列表所有li的top值
      _initTop() {
        const tops = []
        let top = 0
        tops.push(top)
        // 获取所有li
        const lis = this.$refs.rightUl.children
        for (let i = 0; i < lis.length; i++) {
          top += lis[i].clientHeight
          tops.push(top)
        }
        // Array.prototype.slice.call(lis).forEach(li => {
        //   top += li.clientHeight
        //   tops.push(top)
        // })

        //  更新tops数组的值
        this.tops = tops
        console.log('tops', tops)
      },

      // 点击左侧列表，右侧列表滑动
      clickLeft(index) {
        // 得到目标位置对应的top
        const top = this.tops[index]
        // 通过rightScroll滚动到对应的位置: scroll.scrollTo(0, -tops[index])
        this.RightScroll.scrollTo(0, -top, 500)
        // 立即更新scrollY为最终位置的top
        this.scrollY = top
      },

      //  点击显示食物大图
      isShowFood(food) {
        // 1、更新food状态
        this.food = food
        // 2、显示food组件
        this.$refs.food.toggleShow()
      }
    },

    components: {
      Food,
      ShopCart
    }
  }

  /*
  * this.$store.dispatch发送请求得到goods
  * mapState得到商品分类列表goods，遍历goods得到每个分类对应的所有foods，遍历foods得到对象的所有food，并绑定所有展示的数据
  * 引入better-scroll，初始化滑动，配置对象
  * 右侧食物列表滑动，左侧对应的分类列表添加样式
  * 初始化scrollY，得到所有good对应的foods列表的top值，生成tops数组
  * 给右侧列表绑定滑动监听scrollEnd
  *
  *
  *
  * 点击显示food大图，更新food状态，显示food组件
  *
  * */
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 224px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden

    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7

      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px

        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700

          .text
            border-none()

        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat

        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px

    .foods-wrapper
      flex: 1

      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7

      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))

        &:last-child
          border-none()
          margin-bottom: 0

        .icon
          flex: 0 0 57px
          margin-right: 10px

        .content
          flex: 1

          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)

          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)

          .desc
            line-height: 12px
            margin-bottom: 8px

          .extra
            .count
              margin-right: 12px

          .price
            font-weight: 700
            line-height: 24px

            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)

            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)

          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>


