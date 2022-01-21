/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
export default (Vue, eventBus) => {
  Vue.mixin({
    created () {
      const callbacks = this.$options.eventBusCallbacks
      let key
      for (key in callbacks) {
        eventBus.$on(key, this[callbacks[key]])
      }
    },

    destroyed () {
      const callbacks = this.$options.eventBusCallbacks
      let key
      for (key in callbacks) {
        eventBus.$off(key, this[callbacks[key]])
      }
    }
  })
}
