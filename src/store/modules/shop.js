import Vue from 'vue'
import {
  reqGoods,
  reqRatings,
  reqInfo
} from "../../api";

import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_FOOD,
  REDUCE_FOOD,
  CLEAR_CART
} from '../mutation-types'

const state = {
  goods: [], //商品列表
  ratings: [], //评价列表
  info: {}, //商家信息
  cartFoods: [], //所有添加到购物车的食物数组
}

const mutations = {
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },
  [ADD_FOOD](state, {food}) {
    if (food.count) {
      food.count++
    } else {
      // 给food添加一个新的属性，属性名为count，值为1
      Vue.set(food, 'count', 1)
      //   将food添加到cartFoods中
      state.cartFoods.push(food)
    }
  },
  [REDUCE_FOOD](state, {food}) {
    if (food.count > 0) {
      food.count--
      // 当food的数量减少到0，才从购物车删除
      if (food.count === 0) {
        const index = state.cartFoods.indexOf(food)
        state.cartFoods.splice(index, 1)
      }
    }
  },
  [CLEAR_CART](state) {
    // 将购物车所有food的count归0
    state.cartFoods.forEach(food => food.count = 0)
    // 重置购物车数组
    state.cartFoods = []
  }

}

const actions = {
  // 异步获取商品列表
  async getGoods({commit}, callback) {
    const result = await reqGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 更新状态后，立即调用回调函数
      typeof callback === 'function' && callback()
    }
  },
  // 异步获取评价列表
  async getRatings({commit}, callback) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      typeof callback === 'function' && callback()
    }
  },
  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },

  // 更新指定食物的数量
  updateFoodCount({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(ADD_FOOD, {food})
    } else {
      commit(REDUCE_FOOD, {food})
    }
  },

//  清空购物车
  clearCart({commit}) {
    commit(CLEAR_CART)
  }
}

const getters = {
  // 返回一个所有food大于0的数组
  // cartFood (state) {
  //   const arr = []
  //   state.goods.forEach(good => {
  //     good.foods.forEach(food => {
  //       if(food.count > 0){
  //         arr.push(food)
  //       }
  //     })
  //   })
  //   return arr
  // },

  // 总数量 totalCount
  totalCount(state) {
    return state.cartFoods.reduce((pre, item) => pre + item.count, 0)
  },

  // 总价格 totalPrice
  totalPrice(state) {
    return state.cartFoods.reduce((pre, item) => pre + item.count * item.price, 0)
  },

  // 总评价数 totalRatings
  totalRatings(state) {
    return state.ratings.length
  },

  // 总好评数 totalRatings
  totalUpRatings(state) {
    return state.ratings.reduce((pre, rating) => pre + (rating.rateType === 0 ? 1 : 0), 0)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
