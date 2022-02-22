/*
 * @Author: 卢嘉乐
 * @Date: 2022-02-08 11:48:12
 * @LastEditors: 卢嘉乐
 * @LastEditTime: 2022-02-21 17:11:26
 * @Description: file content
 */
import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      state.count++
    },
    min(state) {
      state.count--
    }
  },
  actions: {},
  modules: {},
})
