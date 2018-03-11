import "babel-polyfill"
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import domain from '@/domain'
Vue.use(Vuex)
const state = {
  tags: [],
  tag1: [],
  tag2: [],
  tag3: [],
  tag4: [],
  tag5: [],
  data: [],
  length: 1,
  json: {},
  table: []
}

const mutations = {
  init(state) {
    state.data = []
  },
  add(state, el) {
    var obj = {}
    obj.sourceAccount = el.sourceAccount
    obj.code = el.code
    if (el.mainImgPath) { obj.mainImgPath = domain.domain1.substring(0, domain.domain1.length - 1) + el.mainImgPath } else { obj.mainImgPath = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517035882434&di=0676cefad1139b4081b7b6d960261b14&imgtype=0&src=http%3A%2F%2Fres10.xzlres.com%2FTravel%2F6352ce6f-c897-4b0a-bcfa-0fd3d6f17f27_450x298_1.jpg' }
    obj.name = el.name
    if (el.endTime) { obj.endTime = [].concat((el.endTime.year + 1900), (el.endTime.month + 1), el.endTime.date).join('/') } else { obj.endTime = '未填写' }
    axios.post(domain.domain1 + 'electric-design/searchAllUsersByKeyAndValue', { 'value': el.sourceAccount, 'key': 'account' }).then((res) => {
      Vue.set(obj, 'company', res.data.name)
    }).catch((err) => { console.log(err) })
    state.data.push(obj)
  }
}
export default new Vuex.Store({
  state,
  mutations
})
