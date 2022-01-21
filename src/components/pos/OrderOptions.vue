<template>
  <v-card id="create">
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" small color="blue darken-2" dark fab>
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <v-btn :to="{ name: 'sections' }" fab small :color="color">
        <v-icon>mdi-menu-open</v-icon>
      </v-btn>
      <v-btn fab small :color="color" @click="$emit('add-items')">
        <v-icon>mdi-silverware</v-icon>
      </v-btn>
      <v-btn v-if="hasPendingItems" fab small :color="color" @click="$emit('print-kot')">
        <v-icon>mdi-thumb-up</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-card>
</template>
<script>
export default {
  name: 'OrderOptions',

  props: {
    hasPendingItems: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    direction: 'top',
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: 'slide-y-reverse-transition',
    color: '#d8dfe2'
  }),

  watch: {
    top (val) {
      this.bottom = !val
    },
    right (val) {
      this.left = !val
    },
    bottom (val) {
      this.top = !val
    },
    left (val) {
      this.right = !val
    }
  }
}
</script>
<style scoped>
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>
