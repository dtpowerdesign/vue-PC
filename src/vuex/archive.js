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
  table: [],
  length: 1
}

const mutations = {
  init(state) {
    state.table = []
  },
  add(state, el) {
    var obj = {}
    obj.code = el.code
    obj.name = el.name
    obj.address = el.address
    obj.category = el.category.concat().join(',')
    obj.type = el.type.concat().join(',')
    obj.voltagelevel = el.voltagelevel
    obj.designProcess = el.designProcess
    obj.major = el.major.concat().join(',')
    obj.amountOfInvestment = el.amountOfInvestment
    obj.endTime = [].concat((el.endTime.year + 1900), (el.endTime.month + 1), el.endTime.date).join('/')
    obj.state = el.state
    state.table.push(obj)
  }
}
export default new Vuex.Store({
  state,
  mutations
})
