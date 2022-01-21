export default {
  path: '/',
  name: 'login',
  meta: {
    authrequired: false
  },
  component: () => import('@/views/Auth.vue')
}
