import Vue from 'vue'
import Vuex from 'vuex'

import sysStore from './modules/system'
import getters from './modules/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sysStore,
    getters
  }
})
