export default {
  path: '/home',
  name: 'home',
  meta: {
    authrequired: true
  },
  component: () => import('@/views/Home.vue'),
  children: [
    {
      path: '',
      name: 'sections',
      meta: {
        authrequired: true
      },
      component: () => import('@/views/home/Sections.vue')
    },
    {
      path: 'order',
      name: 'order',
      props: true,
      meta: {
        authrequired: true
      },
      component: () => import('@/views/home/Order.vue')
    },
    {
      path: 'settings/',
      name: 'settings',
      meta: {
        authrequired: true
      },
      component: () => import('@/views/home/Settings.vue')
    }
  ]
}
