import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from './auth'
import Home from './home'
import Setup from './settings'

Vue.use(VueRouter)

const routes = [
  Auth,
  Home,
  Setup
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
