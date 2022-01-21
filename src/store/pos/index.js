import API from '@/api'

const PATH = 'pos/'
const SALES = 'scylla/'
const MENU = 'menu/'

export default {
  namespaced: true,
  state: {
    sections: [],
    departments: [],
    loading: false,
    runningOrder: null
  },
  mutations: {
    setRunningOrder (state, order) {
      state.runningOrder = order
    },
    setDepartments (state, departments) {
      state.departments = departments
    },
    setSections (state, sections) {
      state.sections = sections
    },
    toggleLoading (state, status) {
      state.loading = status
    }
  },
  actions: {
    getDepartments ({ commit }) {
      const filters = new FormData()
      filters.append('get_departments', 'all')
      filters.append('company_id', localStorage.getItem('smart_company_id'))
      API.smart(MENU, filters)
        .then(response => {
          if (!response.error) {
            commit('setDepartments', response.data)
          }
        })
        .catch(e => {
          console.error('Error fetching departments', e)
        })
    },
    confirmOrder (context, orderId) {
      if (!orderId) return
      const filters = new FormData()
      filters.append('confirm_order', orderId)
      return API.smart(PATH, filters)
    },

    addItemToOrder (context, payload) {
      const filters = new FormData()
      const params = Object.keys(payload)
      params.forEach((param) => {
        filters.append(param, payload[param])
      })
      return API.smart(PATH, filters)
    },

    async fetchTables ({ commit, dispatch }) {
      const COMPANYID = localStorage.getItem('smart_company_id')
      const DayOpen = localStorage.getItem('smart_company_day_open')

      const params = new FormData()
      params.append('get_setup_sections', COMPANYID)
      params.append('day_open', DayOpen)
      API.smart(PATH, params)
        .then(response => {
          commit('setSections', response.data)
        })
        .catch(e => {
          dispatch('auth/seterror', e.message)
        })
        .finally(() => {
          commit('toggleLoading', false)
        })
    },

    findOrder ({ commit }, orderId) {
      const filters = new FormData()
      filters.append('find_bill', orderId)
      filters.append('from', '')
      filters.append('to', '')
      filters.append('status', 0)
      filters.append('client_id', '')
      filters.append('company_id', localStorage.getItem('smart_company_id'))
      return API.smart(SALES, filters)
    },

    getOrderItems ({ commit }, orderId) {
      const data = new FormData()
      data.append('get_order_items', orderId)
      return API.smart(SALES, data)
    },

    getAddonItems () {
      const COMPANYID = localStorage.getItem('smart_company_id')
      const data = new FormData()
      data.append('get_menu_items', 'addons')
      data.append('company_id', COMPANYID)
      return API.smart(MENU, data)
    },

    getMenuItems ({ commit }, department) {
      const COMPANYID = localStorage.getItem('smart_company_id')
      const data = new FormData()
      data.append('get_menu_items', department)
      data.append('company_id', COMPANYID)
      return API.smart(MENU, data)
    },

    checkTableStatus (context, tableId) {
      const companyId = localStorage.getItem('smart_company_id')
      const params = new FormData()
      params.append('check_table_status', tableId)
      params.append('company_id', companyId)
      return API.smart(PATH, params)
    },

    createNewOrder ({ commit }, payload) {
      commit('toggleLoading', true)
      const filters = new FormData()
      filters.append('create_new_order', payload.company_id)
      filters.append('user_id', payload.user_id)
      filters.append('date', payload.date)
      filters.append('time', payload.time)
      filters.append('table_id', payload.table_id)
      filters.append('outlet_id', payload.outlet_id)
      commit('toggleLoading', false)
      return API.smart(PATH, filters)
    },

    updateRunningOrder ({ commit }, payload) {
      const filters = new FormData()
      const params = Object.keys(payload)
      params.forEach((param) => {
        filters.append(param, payload[param])
      })
      return API.smart(PATH, filters)
    }
  },
  getters: {
    sections: (state) => state.sections,
    departments: (state) => state.departments,
    runningOrder: (state) => state.runningOrder
  }
}
