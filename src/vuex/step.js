import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  stepName: ['身份选择', '填写项目信息', '最终确认'],
  steps: [1, 2, 3, 4, 5, 6],
  step: 1,
  description: ['发布新项目前选择您的身份，方便项目的填写，若您对表单不了解，会由工作人员协同您填写', '在此页面填写与项目有关的基本信息,方便设计人员了解您的项目，有利于项目的进行', '最后确认您的项目信息，点击确认即可发布', '步骤四的说明', '步骤五的说明', '步骤六的说明'],
  radioStep1: '',
  form: {
    company: '某某公司',
    name: '项目',
    state: '',
    sizeAndCapacitys: '',
    categorys: [],
    unit: '',
    type: [],
    voltagelevel: '',
    place: '',
    major: [],
    designState: '',
    startTime: '',
    endTime: '',
    character: '',
    performanceReq: '',
    lowPrice: '',
    highPrice: '',
    priceType: '',
    aptitude: '',
    paymentMethods: '',
    isAcceptJointBid: 'true',
    stateUnits: [
      { state: '未填', endTime: '未填', requireResult: '未填' },
      { state: '未填', endTime: '未填', requireResult: '未填' },
      { state: '未填', endTime: '未填', requireResult: '未填' }
    ],
  },
  qualificationRequirements: { CET: '' },
  projectCharacteristics: { difficulty: '', price: '' },
  unit: ['km', 'm', 'cm', 'dm', '其他'],
  existingData: { detail: '' },
  states: ['临时态', '发布中', '投标中'],
  major: ['计算机', '电力', '岩土', '绘测'],
  designState: ['前期', '项目建议书', '可行性研究报告', '招投标', '初步设计', '施工图设计', '竣工图编制'],
  sizeAndCapacitys: ['MW', 'KW', 'kVA'],
  categorys: ['火电', '水电', '风电', '光伏', '核电', '储能'],
  type: ['发电厂', '输电', '变电', '供配电', '建筑'],
  voltagelevel: ['直流800KV', '直流500KV', '直流690V', '交流1000KV', '交流750KV', '交流500KV', '交流330KV', '交流220KV', '交流110KV', '交流66KV', '交流35KV', '交流20KV', '交流10KV', '交流6KV', '交流380V', '交流220V', ],
  character: ['单位', '公司'],
  performanceReq: ['高', '中'],
  priceType: ['最低', '最高'],
  aptitude: ['高资质', '低资质'],
  paymentMethods: ['平台推荐', '个人']
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
  },
  addStateUnits(state) {
    state.form.stateUnits.push({ state: '未填', endTime: '未填', requireResult: '未填' })
  },
  myDelete(state, el) {
    state.form.stateUnits = state.form.stateUnits.filter(o => o.state !== el.state)
  }
}
export default new Vuex.Store({
  state,
  mutations
})
