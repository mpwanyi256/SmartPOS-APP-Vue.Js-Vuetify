import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import idb from '@/plugins/indexedDB.js'
import eventBus from './plugins/event-bus'
import EventBusCallbacks from './plugins/Eventbus'

Vue.use(EventBusCallbacks, eventBus)

Vue.prototype.$eventBus = eventBus

idb.init()
  .then(() => {
    console.log('Initiated idb')
  })
  .catch(e => {
    console.error('Failed to initiate IDB')
  })

// Api server address set
const IPAddress = localStorage.getItem('smartpos_ipaddress_set')
axios.defaults.baseURL = `${IPAddress}/papi/` || 'http://localhost:80/papi/'

Vue.config.productionTip = false

// Auth user
const LoggedInUser = localStorage.getItem('smart_user_id')
if (LoggedInUser) {
  store.dispatch('auth/getUserById')
  store.dispatch('pos/getDepartments')
}

// router.beforeEach((to, from, next) => {
//   console.log('to', to.meta, to.name)
//   if (to.meta.authrequired && !LoggedInUser) {
//     return next({ replace: true, name: 'login' })
//   }
//   next()
// })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
