<template>
  <div class="home">
    <Navbar  v-if="currentPage !== 'order'" />
    <div class="routes-view">
      <router-view></router-view>
      <v-snackbar
        v-model="snackbar" top
        :timeout="2000"
      >
        {{ notification }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs"
            @click="closeSnackBar"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <BottomNav
      v-if="currentPage === 'order'"
      @add-items="addItems = true"
    />
  </div>
</template>

<script>
import Navbar from '@/components/nav/Navbar.vue'
import BottomNav from '@/components/nav/BottomNav.vue'

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Home',

  components: {
    Navbar,
    BottomNav
  },

  data () {
    return {
      snackbar: false
    }
  },

  computed: {
    ...mapGetters('notify', ['notification']),

    currentPage () {
      return this.$route.name
    }
  },

  watch: {
    notification (val) {
      if (val && val.length) {
        this.snackbar = true
        setTimeout(() => {
          this.notify('')
          this.snackbar = false
        }, 3000)
      } else {
        this.snackbar = false
      }
    }
  },

  created () {
    this.getOutletSettings()
  },

  methods: {
    ...mapMutations('notify', ['notify']),
    ...mapActions('settings', ['getOutletSettings']),

    closeSnackBar () {
      this.notify('')
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

  .home {
    height: 100vh;
    width: 100vw;
    top: 0;
    bottom: 0;
    overflow: hidden;
    background-color: $bg_color;
    font-size: 14px;
    font-family: $font-style !important;

    .routes-view {
      width: inherit;
      height: calc(100vh - 52px);
      overflow: hidden;
    }

    ::-webkit-scrollbar{
      width: 0;
      height: 0;
    }

    ::-webkit-scrollbar-thumb {
      background: $scrollbar-color;
      border-radius: 0;
      -webkit-border-radius: 0;
    }

    ::-webkit-scrollbar-corner {
      background: #000;
    }
  }
</style>
