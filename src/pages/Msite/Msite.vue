<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(arr, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c, index) in arr" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!--添加分页-->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="loading" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'
  import {mapState} from 'vuex'
  import ShopList from '../../components/ShopList/ShopList.vue'

  export default {
    mounted() {
      // 触发vuex的getCategorys()，从后台获取categorys
      this.$store.dispatch('getCategorys')
      // 触发vuex的getShops()，从后台获取shops
      this.$store.dispatch('getShops')

    },
    computed: {
      // ...mapState(['address', 'categorys']),
      ...mapState({
        address: state => state.msite.address,
        categorys: state => state.msite.categorys
      }),

      //  根据一维数组，生成二维数组，二维数组中小数组的长度最大值为8
      categorysArr() {
        const {categorys} = this
        const Arr = [] // 大数组
        let smallArr = [] // 大数组里面的小数组

        categorys.forEach(c => {
          // 将smallArr保存到Arr中(只保存一次)
          if (smallArr.length === 0) {
            Arr.push(smallArr)
          }
          // 将c保存到smallArr中
          smallArr.push(c)
          if (smallArr.length === 8) {
            smallArr = []
          }
        })
        return Arr
      }
    },
    watch: {
      // 先更新状态数据（监视回调会立即调用），之后才会更新界面
      categorys() { //category状态更新
        // 必须在列表页面显示之后才执行
        /*将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新*/
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }
    },

    components: {
      ShopList
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .msite //首页
    width 100%

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

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff

      .swiper-container
        width 100%
        height 100%

        .swiper-wrapper
          width 100%
          height 100%

          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap

            .link_to_food
              width 25%

              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0

                img
                  display inline-block
                  width 50px
                  height 50px

              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666

        .swiper-pagination
          > span.swiper-pagination-bullet-active
            background #02a774

    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff

      .shop_header
        padding 10px 10px 0

        .shop_icon
          margin-left 5px
          color #999

        .shop_header_title
          color #999
          font-size 14px
          line-height 20px


</style>
