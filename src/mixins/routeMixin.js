import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'RoutingMixin',

  data () {
    return {
      drawer: false,
      manageRoute: {
        icon: 'mdi-cart', name: 'Manage', path: 'manage_clients', allowedUsers: []
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['routes']),
    ...mapGetters('auth', ['user']),

    package () {
      return this.user.package
    },

    userRole () {
      return this.user ? this.user.role : 3
    },

    filteredRoutes () {
      return this.routes
    },

    companyInfo () {
      return this.user ? this.user.company_info : null
    },

    isProtectedManageAccount () {
      return this.companyInfo.company_email === 'prodevgroup256@gmail.com'
    },

    userName () {
      return this.user && this.user.first_name ? `${this.user.last_name}` : 'User'
    },

    activeRoute () {
      return this.$route.path
    }
  },
  methods: {
    ...mapActions('auth', ['performLogout']),
    gotTopage (route) {
      this.$router.push({ name: route.path })
    },
    isActiveRoute (path) {
      const link = path.toLowerCase()
      return this.activeRoute.toLowerCase().split(`${link}`).length > 1
    }
  }
}
