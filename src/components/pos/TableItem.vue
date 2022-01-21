<template>
    <div class="table"
        :class="isSelectedTable"
        @click="$emit('order', table)"
        :ref="`SmartPosTable${table.id}`"
    >
        {{ table.name }}
        <template  v-if="table.order.order_number">
          <br>
          <small>
            #{{ table.order.order_number }}
          </small>
          <v-icon
            v-if="table.order.bill_printed"
            class="printer">
            mdi-printer
          </v-icon>
        </template>
    </div>
</template>
<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'TableComponent',
  props: {
    table: {
      type: Object,
      required: true
    }
  },
  computed: {
    // ...mapGetters('pos', ['runningOrder', 'orders']),

    tableOrderId () {
      return this.table.order.id
    },

    tableOrder () {
      return this.orders.find((Order) => Order.order_id.match(this.table.order.order_number))
    },

    selectedTable () {
      return 0
      // return this.runningOrder ? this.runningOrder.table_id : 0
    },

    hasOrder () {
      return this.table.order.id > 0
    },

    isSelectedTable () {
      // eslint-disable-next-line no-nested-ternary
      return (this.selectedTable === this.table.id) && this.hasOrder ? 'isSelected' : this.hasOrder ? 'hasOrder' : ''
    }
  },
  eventBusCallbacks: {
    'toggle-running': 'toggleRunning',
    'get-waiter-info': 'reoadOrder'
  },
  methods: {
    reoadOrder (orderId) {
      // eslint-disable-next-line eqeqeq
      if (this.tableOrderId == orderId) this.$emit('order', this.table)
    },

    toggleRunning (orderId) {
      if (orderId === this.tableOrderId) this.$emit('order', this.table)
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

::v-deep .v-expansion-panel-content__wrap {
  padding: 0px;
}

.table {
    background-color: $white;
    border: 1px solid $border-color;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 70px;
    margin: 3px;
    cursor: pointer;
    font-size: 14px !important;
    overflow: hidden;

    .printer {
      color: $accent-color !important;
    }
  }

  .isSelected {
    background-color: $accent-color !important;
    color: $white;

    .printer {
      color: $white !important;
    }
  }

  .hasOrder {
    border: 1px solid $accent-color !important;
    color: $accent-color;
  }

</style>
