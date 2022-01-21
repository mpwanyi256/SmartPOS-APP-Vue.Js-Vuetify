<template>
    <div class="main-login">
      <div class="auth_area">
          <v-card class="auth_card">
            <v-card-text>
                <div class="text-center mb-12">
                <h1>Set server IP</h1>
                </div>
                <v-divider></v-divider>
                <v-form @submit.prevent="setIpAddress">
                    <v-text-field dense outlined v-model.trim="ipaddress" label="Server Ip address"></v-text-field>
                    <v-btn type="submit" block class="btn-login">Save</v-btn>
                </v-form>
            </v-card-text>
            <v-progress-linear v-if="loading" indeterminate color="black" />
          </v-card>
      </div>
      <Footer />
    </div>
</template>
<script>
import Footer from '@/components/generics/Footer.vue'
import axios from 'axios'

export default {
  name: 'Setup',
  components: {
    Footer
  },

  data () {
    return {
      ipaddress: ''
    }
  },

  created () {
    const setIP = localStorage.getItem('smartpos_ipaddress_set')
    this.ipaddress = setIP || ''
  },

  methods: {
    setIpAddress () {
      if (this.ipaddress.length <= 4) return
      localStorage.setItem('smartpos_ipaddress_set', this.ipaddress)
      axios.defaults.baseURL = `${this.ipaddress.trim()}/papi/`
      this.$router.replace({ name: 'login' })
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
