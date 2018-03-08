import "babel-polyfill"
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  major: ['计算机', '电力', '岩土', '绘测'],
  designState: ['前期', '项目建议书', '可行性研究报告', '招投标', '初步设计', '施工图设计', '竣工图编制'],
  sizeAndCapacitys: ['MW', 'KW', 'kVA'],
  categorys: ['火电', '水电', '风电', '光伏', '核电', '储能'],
  type: ['发电厂', '输电', '变电', '供配电', '建筑']
}
const mutations = {}
export default new Vuex.Store({
  state,
  mutations
})
