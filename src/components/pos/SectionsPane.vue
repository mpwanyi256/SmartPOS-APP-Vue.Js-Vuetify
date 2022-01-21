<template>
    <div class="sections">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(section,i) in sections"
          :key="i"
        >
          <v-expansion-panel-header
            :class="section.has_orders ? 'has-orders' : ''">
            <div>
              <span v-if="section.has_orders">
                {{ ordersCount(section) }}
              </span>
              {{ section.name }}
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content
          class="expansion_panel">
            <div class="tables_display">
              <TableComponent
                v-for="table in activeTables(section)"
                :key="`pos-table${table.id}`"
                :table="table"
                @order="confirmOrderCreation(table)"
              />
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <ConfirmModal
        v-if="dialog && tableSelected"
        :title="`Create new order for ${tableSelected.name}`"
        @close="cancelCreate"
        @yes="createOrder"
      />
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import TableComponent from '@/components/pos/TableItem.vue'
import ConfirmModal from '@/components/generics/ConfirmModal.vue'
import TimezoneMixin from '@/mixins/TimezoneMixin'

export default {
  name: 'SectionsPane',

  mixins: [
    TimezoneMixin
  ],

  components: {
    TableComponent,
    ConfirmModal
  },

  props: {
    sections: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    dayOpen: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      tableSelected: null,
      dialog: false
    }
  },

  methods: {
    ...mapActions('pos', ['createNewOrder', 'checkTableStatus']),

    cancelCreate () {
      this.tableSelected = null
      this.dialog = false
    },

    activeTables (section) {
      return section.tables.filter((Table) => Table.hidden === false)
    },

    ordersCount (section) {
      return section.tables.filter((Table) => Table.order.id !== null).length
    },

    confirmOrderCreation (table) {
      this.checkTableStatus(table.id)
        .then((response) => {
          if (!response.error) {
            this.$router.push({
              name: 'order',
              params: {
                orderId: response.order_id
              }
            })
          } else {
            this.tableSelected = table
            this.dialog = true
          }
        })
        .catch((e) => {
          console.log('Error fetching table status', e)
        })
    },

    async createOrder () {
      if (!this.user) return

      this.createNewOrder({
        table_id: this.tableSelected.id,
        company_id: this.user.company_id,
        outlet_id: this.user.outlet_id,
        user_id: this.user.id,
        date: this.dayOpen,
        time: this.time
      }).then(response => {
        this.$router.push({
          name: 'order',
          params: {
            orderId: response.order_id
          }
        })
      }).catch(e => {
        console.error('Error creating new order', e)
      })
      this.dialog = false
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.sections {
  display: flex;
  margin: 5px;
  color: $black;
  font-size: 14px;
}

  ::v-deep .v-expansion-panel-content__wrap {
    padding: 0px;
  }

.has-orders {
  background-color: $header !important;
  font-weight: bold;
  font-size: 12px;
  border-bottom: 1px solid $border-color;

  span {
    color: $accent-color;
    margin-right: 5px;
    font-size: 14px;
  }
}

.tables_display {
  max-height: 210px;
  overflow-y: auto;
  overflow-x: hidden;
  display: grid;
  padding: 10px;
  margin-bottom: 10px;

  ::-webkit-scrollbar {
    width: 0px !important;
    height: 0px !important;
  }

  ::-webkit-scrollbar-thumb {
    background: white !important;
    border-radius: 1ex;
    -webkit-border-radius: 1ex;
  }

  ::-webkit-scrollbar-corner {
    background: white !important;
  }

  // Desktop view
  @media screen and (max-width: 400px) {
    grid-template-columns: 100%;
  }

  @media screen and (min-width: 401px) {
    grid-template-columns: 50% 50%;
  }

  @media screen and (min-width: 700px) {
    grid-template-columns: 33.3% 33.3% 33.3%;
  }

  @media screen and (min-width: 1000px) {
    grid-template-columns: 25% 25% 25% 25%;
  }

}

</style>
