export default {
  path: '/setup',
  name: 'setup',
  meta: {
    authrequired: false
  },
  component: () => import('@/views/Setup.vue')
}
