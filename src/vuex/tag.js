import "babel-polyfill"
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  tags: [],
  tag1: [],
  tag2: [],
  tag3: [],
  tag4: [],
  tag5: [],
  tag6: [],
  table: [],
  length: 1,
  json: {}
}

const mutations = {
  init(state) {
    state.table = []
  },
  add(state, el) {}
}
export default new Vuex.Store({
  state,
  mutations
})
