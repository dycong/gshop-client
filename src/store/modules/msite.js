import {
  reqAddress,
  reqCategorys,
  reqShops,
} from "../../api";

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
} from '../mutation-types'

const state ={
  longitude: '116.36867', // 经度
  latitude: '40.1003', //纬度
  address: {}, // 保存当前地址信息
  categorys: [], // 商品分类列表
  shops: [], // 商家分类列表
}

const mutations = {
  [RECEIVE_ADDRESS](state, address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, shops) {
    state.shops = shops
  },
}

const actions = {
  //  异步获取地址
  async getAddress({commit, state}) {
    // 1、发送ajax请求
    const {longitude, latitude} = state
    const result = await reqAddress(longitude, latitude)
    // 2、请求成功后，提交mutation
    if (result.code === 0) {
      commit(RECEIVE_ADDRESS, result.data)
    }
  },

  // 异步获取商品分类列表
  async getCategorys({commit}) {
    // 1、发送ajax请求
    const result = await reqCategorys()
    // 2、请求成功后，提交mutation
    if (result.code === 0) {
      commit(RECEIVE_CATEGORYS, result.data)
    }
  },

  // 异步获取商家分类列表
  async getShops({commit, state}) {
    // 1、发送ajax请求
    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    // 2、请求成功后，提交mutation
    if (result.code === 0) {
      commit(RECEIVE_SHOPS, result.data)
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
