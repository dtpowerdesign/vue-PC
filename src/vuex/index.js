import Vue from 'vue'
import Vuex from 'vuex'
import tag from './tag'
import archive from './archive'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tag: tag,
    archive: archive
  }
})
