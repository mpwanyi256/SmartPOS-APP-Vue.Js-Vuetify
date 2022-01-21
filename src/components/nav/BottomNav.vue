<template>
    <div class="nav">
        <v-bottom-navigation v-model="value">
            <v-btn :to="{ name: 'sections' }" value="tables">
                <span>Tables</span>
                <v-icon>mdi-menu-open</v-icon>
            </v-btn>

            <v-btn @click="addItemsToOrder" value="addItems">
                <span>Add Items</span>
                <v-icon>mdi-silverware</v-icon>
            </v-btn>

            <v-btn @click="confirmOrder" value="confirm">
                <span>PRINT KOT</span>
                <v-icon>mdi-printer</v-icon>
            </v-btn>

            <!-- <v-btn value="shift">
              <span>Shift Table</span>
              <v-icon>mdi-arrow-expand</v-icon>
            </v-btn> -->
        </v-bottom-navigation>
    </div>
</template>
<script>

export default {
  name: 'BottomNav',

  data () {
    return {
      value: ''
    }
  },

  methods: {
    addItemsToOrder () {
      this.$eventBus.$emit('add-items-to-order')
    },

    confirmOrder () {
      this.$eventBus.$emit('confirm-kot-order')
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

 .nav {
    top: 0;
    left: 0;
    width: 100%;
    height: 52px;
    min-width: 100vw;
    background-color: $white;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    > div {
        width: 100%;
    }
 }
</style>
