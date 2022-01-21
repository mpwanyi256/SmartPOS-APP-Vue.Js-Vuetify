import API from '@/api'

const PATH = 'settings/'

export default {
  namespaced: true,
  state: {
    controls: []
  },
  mutations: {
    loading (state, payload) {
      state.loading = payload
    },
    setColtrols (state, payload) {
      state.controls = payload
    }
  },
  actions: {
    async getOutletSettings ({ commit }) {
      commit('loading', true)
      const OUTLET = localStorage.getItem('smart_outlet_id')
      const params = new FormData()
      params.append('get_access_controls', OUTLET)
      commit('loading', false)
      const conts = await API.smart(PATH, params)
      if (!conts.error) commit('setColtrols', conts.data)
    }
  },
  getters: {
    controls: (state) => state.controls
  }
}
