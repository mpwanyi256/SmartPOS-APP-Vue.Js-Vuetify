<template>
    <div class="nav" v-if="companyInfo">
    <div class="wrapper">
      <div class="nav-content">
        <div class="title">
          <div class="menu_icons">
            <v-app-bar-nav-icon @click="drawer = true" />
            <p>
              Smart POS |
              <small class="user_name">
                {{ userName }} -
                <strong>{{ companyInfo.day_open_display }}</strong>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
   <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <SalesNavBar :title="'Quick links'" :links="routes">
        <template slot="logout">
          <div class="menu">
            <div class="tray">
              <div class="side_bar_auth" @click="performLogout()">
                <v-icon small class="icon" dark>
                  mdi-lock
                </v-icon>
                Logout
              </div>
            </div>
          </div>
        </template>
      </SalesNavBar>
   </v-navigation-drawer>
  </div>
</template>
<script>
import RoutingMixin from '@/mixins/routeMixin'
import SalesNavBar from '@/components/nav/SalesNavBar.vue'

export default {
  name: 'Navbar',
  mixins: [RoutingMixin],
  components: {
    SalesNavBar
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/nav/style.scss';
</style>
