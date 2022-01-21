<template>
    <div class="sections">
      <SectionsPane
        v-if="user"
        :sections="sections"
        :user="user"
        :day-open="dayOpen"
      />
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import SectionsPane from '@/components/pos/SectionsPane.vue'

export default {
  name: 'Sections',

  components: {
    SectionsPane
  },

  computed: {
    ...mapGetters('pos', ['sections']),
    ...mapGetters('auth', ['user']),

    dayOpen () {
      return this.user ? this.user.company_info.day_open : ''
    }
  },

  methods: {
    ...mapActions('pos', ['fetchTables'])
  },

  created () {
    this.fetchTables()
  }
}
</script>
<style scoped>
    .sections {
        height: inherit;
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>
