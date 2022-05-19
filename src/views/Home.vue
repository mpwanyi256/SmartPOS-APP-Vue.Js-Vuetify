<template>
  <div class="home">
    <Navbar />
    <div :class="currentPage === 'order' ? 'routes-view-order' : 'routes-view-home'">
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
import dataSync from '@/mixins/dataSync'

import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'Home',

  mixins: [dataSync],

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

  async created () {
    const CONTROLS = await this.getSynchedSettings().catch(e => [])
    delete CONTROLS.data_key
    this.addonItems = CONTROLS.controls
    this.loading = false
    this.setColtrols(CONTROLS)
  },

  methods: {
    ...mapMutations('notify', ['notify']),
    ...mapActions('settings', ['getOutletSettings']),
    ...mapState('settings', ['setColtrols']),

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

    .routes-view-home {
      width: inherit;
      height: calc(100vh - 52px);
      overflow: hidden;
    }

    .routes-view-order {
      width: inherit;
      height: calc(100vh - 104px);
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
