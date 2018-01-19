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
  table: []
}
export default new Vuex.Store({
  state
})
