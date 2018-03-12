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
  add(state, el) {
    //   var obj = {}
    //   obj.code = el.code
    //   obj.name = el.name
    //   obj.address = el.address
    //   obj.category = el.category.concat().join(',')
    //   obj.type = el.type.concat().join(',')
    //   obj.voltagelevel = el.voltagelevel
    //   obj.designProcess = el.designProcess
    //   obj.major = el.major.concat().join(',')
    //   if (!el.lowestPrice) { el.lowestPrice = '未填最低值' }
    //   if (!el.highestPrice) { el.highestPrice = '未填最高值' }
    //   obj.amountOfInvestment = el.lowestPrice + '-' + el.highestPrice
    //   if (el.endTime) { obj.endTime = [].concat((el.endTime.year + 1900), (el.endTime.month + 1), el.endTime.date).join('/') } else { obj.endTime = '未填写' }
    //   obj.state = el.state
    //   state.table.push(obj)
  }
}
export default new Vuex.Store({
  state,
  mutations
})
