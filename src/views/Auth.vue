<template>
    <div class="main-login">
      <div class="auth_area">
          <v-card class="auth_card">
            <v-card-text>
                <div class="text-center mb-12">
                <h1>Smart POS APP</h1>
                </div>
                <v-divider></v-divider>
                <v-form @submit.prevent="loginUser">
                    <v-text-field dense outlined v-model.trim="Username" label="Username"></v-text-field>
                    <v-text-field dense outlined v-model.trim="Password" label="Password" type="password">
                    </v-text-field>
                    <v-btn type="submit" block class="btn-login">Login</v-btn>
                </v-form>
            </v-card-text>
            <BaseAlert
              :type="`error`"
              :message="error.message"
            />
            <v-progress-linear v-if="loggingIn" indeterminate color="black" />
          </v-card>
      </div>
      <p class="server-ip">{{ `Server address: ${ipSet}` }}</p>
      <Footer />
    </div>
</template>
<script>
import Footer from '@/components/generics/Footer.vue'
import BaseAlert from '@/components/generics/BaseAlert.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Auth',
  components: {
    Footer,
    BaseAlert
  },

  data () {
    return {
      Username: '',
      Password: ''
    }
  },

  computed: {
    ...mapGetters('auth', ['error']),

    ipSet () {
      return localStorage.getItem('smartpos_ipaddress_set')
    },

    loggingIn: {
      get () {
        return this.loading
      },
      set () {
        return this.loading
      }
    }
  },

  methods: {
    ...mapMutations('auth', ['clearError', 'seterror']),
    ...mapActions('auth', ['performLogin']),

    async loginUser () {
      try {
        this.clearError()
        if (this.Username.toLowerCase() === 'x' && this.Password.toLowerCase() === 'x') {
          this.$router.push({ name: 'setup' })
          return
        }

        if (this.Username.length <= 2) {
          this.seterror('Sorry, Username Must be atleast 3 Characters long')
        } else if (this.Username.Password <= 5) {
          this.seterror('Sorry, Password Must be atleast 6 Characters long')
        } else {
          this.loading = true
          const credentials = {
            username: this.Username.trim(),
            password: this.Password.trim()
          }
          await this.performLogin(credentials)
          if (this.error.message === 'Sorry, your license expired') {
            this.getLicense()
          }
          this.loading = false
        }
      } catch (e) {
        this.seterror(`Code error ${e}`)
      }
    }
  }

}
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.main-login {
  font-family: $font-style !important;
  background-color: $bg_color;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 0;

  .server-ip {
    font-size: 12px;
    color: $grey;
    text-align: center;
    font-weight: 400;
    margin-bottom: 40px;
  }

  .auth_area {
    height: calc(100vh - 36px);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    .auth_card {
        background-color: $white;
        opacity: 0.7.5;
        border: 1px solid $border-color;
        width: 80%;
        color: $black !important;
    }
  }
}
</style>
