import "babel-polyfill"
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import domain from '@/domain'
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
    categorys: '',
    unit: '',
    type: [],
    voltagelevel1: '',
    voltagelevel2: 100,
    voltagelevel3: '',
    place: '',
    major: [],
    designState: '',
    startTime: '',
    endTime: '',
    character: '',
    performanceReq1: '',
    performanceReq2: '',
    lowPrice: '暂无',
    highPrice: '暂无',
    priceType: '',
    aptitude: '',
    paymentMethods: '',
    paymentScale: '',
    isAcceptJointBid: 'true',
    instruction: '',
    requirement: '',
    payDiscible: '',
    projectNowState: '',
    hasInvoice: 'no',
    stateUnits: [
      { state: '未填', endTime: '未填', requireResult: '未填' },
      { state: '未填', endTime: '未填', requireResult: '未填' },
      { state: '未填', endTime: '未填', requireResult: '未填' }
    ],
  },
  qualificationRequirements: { CET: '' },
  projectCharacteristics: { difficulty: '', price: '' },
  unit: ['MW', 'Kva', 'KV', `M^2`],
  existingData: { detail: '' },
  states: [{ 'value': '发布中', 'label': '发布完不立即招标' }, { 'value': '投标中', 'label': '发布完直接招标' }],
  major: ['计算机', '电力', '岩土', '绘测'],
  designState: ['前期', '项目建议书', '可行性研究报告', '招投标', '初步设计', '施工图设计', '竣工图编制'],
  sizeAndCapacitys: ['MW', 'KW', 'kVA'],
  categorys: ['火电', '水电', '风电', '光伏', '核电', '储能'],
  type: ['发电厂', '输电', '变电', '供配电', '建筑'],
  voltagelevel: ['KV', 'V'],
  voltagetype: ['直流', '交流'],
  character: ['单位', '公司'],
  performanceReq: ['同类型同规模', '同类型'],
  priceType: ['最低', '最高'],
  aptitude: ['高资质', '低资质'],
  paymentMethods: ['一次性付款', '分阶段付款'],
  paymentScale: ['1:1', '2:1', '3:1'],
  projectNowStates: ['未开始', '项目建议书', '可研已定', '初设已定', '施工图已定', '竣工图已定']
}

const mutations = {
  init(state) {
    state.step = 1
  },
  init2(state) {
    state.step = 2
    axios.post(domain.domain1 + 'electric-design/getDataOfClassKey').then((res) => {
      console.log(res.data)
      state.categorys = res.data.categorys
      state.type = res.data.types
      state.designState = res.data.designProcess
      state.unit = res.data.sizeAndCapacitys
      state.major = res.data.majors
    }).catch((err) => {
      console.log(err)
      this.$message({
        showClose: true,
        message: '网络连接错误',
        type: 'error'
      })
    })
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
