import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import pos from './pos'
import notify from './notify'
import print from './print'
import settings from './settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    pos,
    notify,
    print,
    settings
  }
})
