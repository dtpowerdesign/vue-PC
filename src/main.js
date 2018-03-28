// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Axios from 'axios'
import qs from 'querystring'
import 'element-ui/lib/theme-chalk/index.css'
import domain from './domain.js'
import appKey from './appKey.js'
import cookie from 'vue-cookie'
import check from './util/check'
import preSQL from './util/preSQL'
import rong from 'co-rongcloud-api'
import formDate from './util/formDate'
import store from './vuex/rong'
// var Promise = require('bluebird')
// window.Promise = Promise
Vue.use(cookie)
Vue.prototype.$domain = domain
Vue.prototype.$appKey = appKey
Vue.prototype.$preSQL = preSQL
Vue.prototype.cookie = cookie
Vue.prototype.$rong = rong
Vue.prototype.$check = check
Vue.prototype.$formDate = formDate
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = Axios
Vue.prototype.$qs = qs

/* eslint-disable */
Vue.directive('drag', //自定义指令                                      JS
  {
    bind: function (el, binding) {
      let oDiv = el; //当前元素
      let self = this; //上下文
      oDiv.style.cursor = 'move'
      oDiv.onmousedown = function (e) {
        //鼠标按下，计算当前元素距离可视区的距离
        let disX = e.clientX - oDiv.offsetLeft;
        let disY = e.clientY - oDiv.offsetTop;

        document.onmousemove = function (e) {
          //通过事件委托，计算移动的距离 
          let l = e.clientX - disX;
          let t = e.clientY - disY;
          //移动当前元素  
          oDiv.style.left = l + 'px';
          oDiv.style.top = t + 'px';
        };
        document.onmouseup = function (e) {

          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  }
)
var bus = new Vue({
  store,
  data: {
    people: []
  }
})
Vue.prototype.$one = bus


var vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
Vue.prototype.$self = vm

const myRongIMLib = window.RongIMLib
const myRongIMClient = myRongIMLib.RongIMClient
Vue.prototype.$RongIMLib = myRongIMLib
Vue.prototype.$RongIMClient = myRongIMClient.setOnReceiveMessageListener
Vue.prototype.$startInit = startInit



// 注册自定义消息
function registerMessage(type, propertys) {
  let messageNmae = type // 消息名称
  let objectName = 's:' + type // 消息内置名称
  let mesasgeTag = new myRongIMLib.Message(true, true) // 保存并计数

  myRongIMClient.registerMessageType(
    messageNmae,
    objectName,
    mesasgeTag,
    propertys
  )
}

function startInit(user, config, targetId) {
  let params = {
    appKey: this.$appKey.appKey,
    token: config.token,
    navi: config.navi || ''
  }

  let userId = ''

  let callbacks = {
    getInstance(instance) {
      myRongIMLib.RongIMEmoji.init()
      let propertys = ['name', 'age', 'gender']
      registerMessage('PersonMessage', propertys)
    },
    getCurrentUser(userInfo) {
      console.log(userInfo.userId)
      userId = userInfo.userId
      console.log('链接成功；userid=' + userInfo.userId)
        // 加入聊天室
    },
    receiveNewMessage: function (message) {
      // 判断是否有 @ 自己的消息
      let mentionedInfo = message.content.mentionedInfo || {}
      let ids = mentionedInfo.userIdList || []
      for (let i = 0; i < ids.length; i++) {
        if (ids[i] === userId) {
          alert('有人 @ 了你！')
        }
      }
      console.log('show1', message)
    }
  }
  init(params, callbacks)
}

function init(params, callbacks, modules) {
  let appKey = params.appKey
  let token = params.token
  let navi = params.navi || ''

  modules = module || {}

  let RongIMLib = modules.RongIMLib || myRongIMLib
  let RongIMClient = RongIMLib.RongIMClient
  let protobuf = modules.protobuf || null

  let config = {}

  // 私有云切换navi导航，私有云格式 '120.92.10.214:8888'
  if (navi !== '') {
    config.navi = navi
  }

  // 私有云切换api,私有云格式 '172.20.210.38:81:8888'
  let api = params.api || ''
  if (api !== '') {
    config.api = api
  }

  // support protobuf url + function
  if (protobuf != null) {
    config.protobuf = protobuf
  }

  RongIMLib.RongIMClient.init(appKey, null, config)

  let instance = RongIMClient.getInstance()

  //   连接状态监听器
  RongIMClient.setConnectionStatusListener({
    onChanged(status) {
      console.log(status)
      switch (status) {
        case RongIMLib.ConnectionStatus['CONNECTED']:
        case 0:
          console.log('连接成功')
          callbacks.getInstance && callbacks.getInstance(instance)
          break

        case RongIMLib.ConnectionStatus['CONNECTING']:
        case 1:
          console.log('连接中')
          break

        case RongIMLib.ConnectionStatus['DISCONNECTED']:
        case 2:
          console.log('当前用户主动断开链接')
          break

        case RongIMLib.ConnectionStatus['NETWORK_UNAVAILABLE']:
        case 3:
          console.log('网络不可用')
          RongIMClient.reconnect(reCallback, reConfig)
          break

        case RongIMLib.ConnectionStatus['CONNECTION_CLOSED']:
        case 4:
          console.log('未知原因，连接关闭')
          RongIMClient.reconnect(reCallback, reConfig)
          break

        case RongIMLib.ConnectionStatus['KICKED_OFFLINE_BY_OTHER_CLIENT']:
        case 6:
          console.log('用户账户在其他设备登录，本机会被踢掉线')
            // RongIMClient.reconnect(reCallback, reConfig)
          break

        case RongIMLib.ConnectionStatus['DOMAIN_INCORRECT']:
        case 12:
          console.log('当前运行域名错误，请检查安全域名配置')
          break
      }
    }
  })

  /**
   *  1.会话唯一性， conversationType + targetId
   *  2.消息体属性说明可参考：http://rongcloud.cn/docs/api/js/index.html
   */
  RongIMClient.setOnReceiveMessageListener({
    // 接收到的消息
    onReceived(message) {
      // 应判断消息类型
      console.log('新消息: ' + message.targetId)
      console.log(message)
      if (message.content.extra === '系统消息') {
        bus.$emit('refreshApply', message)
        bus.$emit('hasApply', message)
      } else {
        bus.$emit('refresh', message)
        bus.$emit('has', message)
      }
      // console.log(this.$store.state.people[0])
      // Vue.set(bus.$data.people, message.targetId, message)
      // console.log(bus.$data.people[message.targetId])
      callbacks.receiveNewMessage && callbacks.receiveNewMessage(message)
    }
  })

  // 开始连接
  RongIMClient.connect(token, {
    onSuccess(userId) {
      callbacks.getCurrentUser && callbacks.getCurrentUser({ userId: userId })
      console.log('链接成功，用户id：' + userId)
    },
    onTokenIncorrect() {
      console.log('token无效')
    },
    onError(errorCode) {
      console.log(errorCode)
    }
  })

  // 重新连接
  var reCallback = {
    onSuccess: function (userId) {
      console.log('Reconnect successfully.' + userId)
    },
    onTokenIncorrect: function () {
      console.log('token无效')
    },
    onError: function (errorCode) {
      console.log(errorCode)
    }
  }
  var reConfig = {
    // 默认 false, true 启用自动重连，启用则为必选参数
    auto: true,
    // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
    url: 'cdn.ronghub.com/RongIMLib-2.2.6.min.js',
    // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
    rate: [100, 1000, 3000, 6000, 10000]
  }
  RongIMClient.reconnect(reCallback, reConfig)
}
