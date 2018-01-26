import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const state = {
  tags: [],
  tag1: [],
  tag2: [],
  tag3: [],
  tag4: [],
  tag5: [],
  data: [],
  length: 1
}

const mutations = {
  init(state) {
    state.data = []
  },
  add(state, el) {
    var obj = {}
    obj.mainImgPath = 'http://39.106.34.156:8080/' + el.mainImgPath
    obj.name = el.name
    obj.endTime = [].concat((el.endTime.year + 1900), (el.endTime.month + 1), el.endTime.date).join('/')
    axios.post('http://39.106.34.156:8080/electric-design/getCuserByAccount', { "account": el.sourceAccount }).then((res) => {
      Vue.set(obj, 'company', res.data.name)
    }).catch((err) => { console.log(err) })
    state.data.push(obj)
  }
}
export default new Vuex.Store({
  state,
  mutations
})
