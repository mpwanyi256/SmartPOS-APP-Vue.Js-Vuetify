export default {
  namespaced: true,
  state: {
    notification: ''
  },
  mutations: {
    notify (state, message) {
      state.notification = message
    }
  },
  getters: {
    notification: (state) => state.notification
  }
}
