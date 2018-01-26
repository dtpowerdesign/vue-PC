import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  stepName: ['身份选择', '填写项目信息', '业绩表确认', '资质要求', '设计成果', '最终确认'],
  steps: [1, 2, 3, 4, 5, 6],
  step: 1,
  description: ['在此页面填写与项目有关的基本信息', '发布新项目前选择您的身份，方便项目的填写，若您对表单不了解，会由工作人员协同您填写', '步骤三的说明', '步骤四的说明', '步骤五的说明', '步骤六的说明'],
  radioStep1: '',
  form: {
    company: 'aaa',
    name: 'bbb',
    state: [],
    sizeAndCapacitys: [],
    categorys: [],
    type: [],
    voltagelevel: '',
    pro: '',
    major: '',
    startTime: '',
    endTime: ''
  },
  qualificationRequirements: { CET: '' },
  projectCharacteristics: { difficulty: '', price: '' },
  existingData: { detail: '' },
  states: ['前期', '中期', '后期'],
  sizeAndCapacitys: ['MW', 'KW', 'kVA'],
  categorys: ['火电', '水电', '风电', '光伏', '核电', '储能'],
  type: ['发电厂', '输电', '变电', '供配电', '建筑']
}

const mutations = {
  init(state) {
    state.step = 1
  },
  init2(state) {
    state.step = 2
  },
  init3(state) {
    state.step = 3
  },
  init4(state) {
    state.step = 4
  },
  init5(state) {
    state.step = 5
  },
  init6(state) {
    state.step = 6
  }
}
export default new Vuex.Store({
  state,
  mutations
})
