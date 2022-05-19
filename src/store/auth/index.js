import API from '@/api'
import router from '@/router'
import store from '@/store'

const PATH = 'auth/'

export default {
  namespaced: true,
  state: {
    loading: false,
    user: null,
    error: { status: false, message: '' },
    routes: [
      {
        icon: 'mdi-cart', name: 'Home', path: 'sections', allowedUsers: [1, 2, 3, 5, 6], packages: [1, 2, 3]
      },
      {
        icon: 'mdi-cog', name: 'Settings', path: 'settings', allowedUsers: [5], packages: [1, 2, 3]
      }
      // { // TO DO :: Add waiter's orders page
      //   icon: 'mdi-account', name: 'My Orders', path: 'orders', allowedUsers: [5], packages: [1, 2, 3]
      // }
    ]
  },
  mutations: {
    toggleLoading (state, status) {
      state.loading = status
    },
    setUser (state, payload) {
      state.user = payload
    },
    seterror (state, payload) {
      state.error = { status: true, message: payload }
    },
    clearError (state) {
      state.error = { status: false, message: '' }
    }
  },
  actions: {
    async performLogin ({ dispatch, commit }, payload) {
      commit('toggleLoading', true)
      const params = new FormData()
      params.append('username', payload.username)
      params.append('password', payload.password)

      API.smart(PATH, params)
        .then(authData => {
          if (authData && authData.error) {
            commit('seterror', authData.message)
          } else {
            const userInfo = authData.data
            localStorage.setItem('smart_user_id', userInfo.id)
            localStorage.setItem('smart_user_name', userInfo.user_name)
            localStorage.setItem('smart_user_role', userInfo.role)
            localStorage.setItem('smart_company_id', userInfo.company_info.company_id)
            localStorage.setItem('smart_company_day_open', userInfo.company_info.day_open)
            localStorage.setItem('smart_company_email', userInfo.company_info.company_email)
            localStorage.setItem('smart_outlet_id', userInfo.outlet_id)
            commit('setUser', userInfo)
            store.dispatch('pos/fetchTables', { root: true })
            store.dispatch('pos/getDepartments')

            const DAYSLEFT = userInfo.company_info.days_left
            const PACKAGE = userInfo.package

            if (DAYSLEFT <= 0) {
              commit('seterror', 'Sorry, your license expired')
              router.replace({ name: 'login' })
              commit('toggleLoading', false)
              return
            }

            // ::TODO
            // dispatch('settings/fetchOutletSettings',
            //   { get_access_controls: 'all', outlet: userInfo.outlet_id }, { root: true })

            if ([1, 2, 3].includes(PACKAGE)) {
              if (userInfo.role === 4) {
                commit('seterror', 'Sorry, your are not alowed to use the app')
                router.push({ name: 'login' })
              } else {
                router.replace({ name: 'sections' })
              }
            //   ::TODO
            //   dispatch('settings/fetch', { get_access_controls: 'all' }, { root: true })
            } else {
              commit('seterror', 'Sorry, you have no access to this section')
              dispatch('performLogout')
            }
          }
        })
        .catch((e) => {
          commit('seterror', e)
          commit('toggleLoading', false)
          return null
        })
        .finally(() => {
          commit('toggleLoading', false)
        })
      // if (!authData) {
      //   commit('seterror', 'Something went wrong. Please check your connection')
      //   return
      // }
      // commit('toggleLoading', false)
    },
    async getUserById ({ dispatch, commit }, payload = null) {
      const loggedinUser = localStorage.getItem('smart_user_id')
      if (!loggedinUser) {
        return router.push({ name: 'login' })
      }

      commit('toggleLoading', true)
      const params = new FormData()
      params.append('auth_by_id', loggedinUser)
      const authData = await API.smart(PATH, params).catch((e) => {
        commit('toggleLoading', false)
        commit('seterror', 'Failed to connect to server')
        return null
      })
      if (authData && authData.error) {
        commit('seterror', authData.message)
        router.replace({ name: 'login' })
      } else {
        const userInfo = authData.data
        localStorage.setItem('smart_user_id', userInfo.id)
        localStorage.setItem('smart_user_name', userInfo.user_name)
        localStorage.setItem('smart_user_role', userInfo.role)
        localStorage.setItem('smart_company_id', userInfo.company_info.company_id)
        localStorage.setItem('smart_company_day_open', userInfo.company_info.day_open)
        localStorage.setItem('smart_company_email', userInfo.company_info.company_email)
        localStorage.setItem('smart_outlet_id', userInfo.outlet_id)
        commit('setUser', userInfo)
        store.dispatch('pos/fetchTables', { root: true })

        const DAYSLEFT = userInfo.company_info.days_left
        const PACKAGE = userInfo.package

        if (DAYSLEFT <= 0) {
          commit('seterror', 'Sorry, your license expired')
          router.replace({ name: 'auth' })
          commit('toggleLoading', false)
          return
        }

        // :: TO-DO
        // dispatch('settings/fetchOutletSettings',
        //   { get_access_controls: 'all', outlet: userInfo.outlet_id }, { root: true })

        const CurrentPath = window.location.pathname
        if (CurrentPath === '/') {
          if ([1, 2, 3].includes(PACKAGE)) {
            if (userInfo.role === 4) {
              commit('seterror', 'Sorry, you do not have access to use the app')
              router.push({ name: 'auth' })
            } else {
              router.replace({ name: 'sections' })
            }
            // ::TODO
            // dispatch('settings/fetch', { get_access_controls: 'all' }, { root: true })
          } else {
            dispatch('seterror', 'Sorry, you have no access to this section')
            dispatch('performLogout')
          }
        }
      }
      commit('toggleLoading', false)
    },
    performLogout ({ commit }) {
      localStorage.removeItem('smart_user_id')
      localStorage.removeItem('smart_user_name')
      localStorage.removeItem('smart_user_role')
      localStorage.removeItem('smart_company_day_open')
      localStorage.removeItem('smart_company_id')
      commit('setUser', null)
      router.push({ name: 'login' })
    }
  },
  getters: {
    user: (state) => state.user,
    loading: (state) => state.loading,
    routes: (state) => state.routes,
    error: (state) => state.error
  }
}
