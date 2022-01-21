<template>
    <div class="nav">
        <v-bottom-navigation v-model="value">
            <v-btn :to="{ name: 'sections' }" value="tables">
                <span>TABLES</span>
                <v-icon>mdi-menu-open</v-icon>
            </v-btn>

            <v-btn @click="addItemsToOrder" value="addItems">
                <span>MENU</span>
                <v-icon>mdi-silverware-variant</v-icon>
            </v-btn>

            <v-btn @click="confirmOrder" value="confirm">
              <span>KOT</span>
              <v-icon>mdi-printer-outline</v-icon>
            </v-btn>

            <v-btn v-if="userCanPrintBill" @click="performBillPrint" value="confirm">
              <span>BILL</span>
              <v-icon>mdi-clipboard-list-outline</v-icon>
            </v-btn>

            <!-- <v-btn value="shift">
              <span>Shift Table</span>
              <v-icon>mdi-arrow-expand</v-icon>
            </v-btn> -->
        </v-bottom-navigation>
    </div>
</template>
<script>
import ControlsMixin from '@/mixins/ControlsMixin'
import PrintingMixin from '@/mixins/PrintingMixin'

export default {
  name: 'BottomNav',

  mixins: [ControlsMixin, PrintingMixin],

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
