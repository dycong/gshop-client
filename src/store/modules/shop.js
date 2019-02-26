import {
  reqGoods,
  reqRatings,
  reqInfo
} from "../../api";

import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from '../mutation-types'

const state ={
  goods: [], //商品列表
  ratings: [], //评价列表
  info: {}, //商家信息
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
  }
}

const actions = {
  // 异步获取商品列表
  async getGoods({commit}) {
    const result = await reqGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
    }
  },
  // 异步获取评价列表
  async getRatings({commit}) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
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
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
