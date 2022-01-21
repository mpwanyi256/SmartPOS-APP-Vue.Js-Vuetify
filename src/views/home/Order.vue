<template>
    <div class="runnning_order">
      <div class="order_header" v-if="order">
        <h2>
          <span>{{ order.table }}</span>
          #{{ order.bill_no }}</h2>
        <div class="date_and_time">
            <p>
                {{ order.date }}
                <span>
                  <v-icon small class="clock_icon">mdi-clock-outline</v-icon>
                </span>
                {{ order.time }}
                <span v-if="order.waiter">
                  <v-icon small class="clock_icon">mdi-account-outline</v-icon>
                  {{ order && order.waiter ? order.waiter.split(' ')[0] : '' }}
                </span>
                <span v-if="clientName">
                  {{ clientName }}
                </span>
                <span v-if="companyType == 1">
                  <!-- <BaseTooltip
                    @button="shift = true"
                    :small="true"
                    color="black"
                    message="Shift table"
                    icon="arrow-expand"
                  /> -->
                </span>
            </p>
        </div>
      </div>
      <OrderListHeader />
      <div class="items_list">
          <div class="items">
            <OrderItem
              v-for="item in orderItems"
              :key="item.id"
              :item="item"
              @viewItems="viewPendingItems"
            />
          </div>
      </div>
      <div class="order_sum_info">
      <OrderTotalCacular
        v-if="order"
        :order="order"
        :show-vat="true"
      />
      </div>
      <OrderItemsList
        v-if="showItems && orderItemSelected"
        @close="showItems = false"
        :item="orderItemSelected"
      />
      <MenuItemsModal
        v-if="addItems"
        @close="addItems = false"
        @add-item="addMenuItemToOrder"
      />
    </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import OrderListHeader from '@/components/pos/OrderListHeader.vue'
import OrderItem from '@/components/pos/OrderItem.vue'
import OrderTotalCacular from '@/components/pos/OrderTotalCacular.vue'
import OrderItemsList from '@/components/pos/OrderItemsList.vue'
// import BaseTooltip from '@/components/generics/BaseTooltip.vue'
import MenuItemsModal from '@/components/home/MenuItemsModal.vue'
import TimezoneMixin from '@/mixins/TimezoneMixin'
import PrintingMixin from '@/mixins/PrintingMixin'

export default {
  name: 'Order',

  mixins: [TimezoneMixin, PrintingMixin],

  components: {
    OrderListHeader,
    OrderItem,
    OrderTotalCacular,
    OrderItemsList,
    // BaseTooltip,
    MenuItemsModal
  },

  data () {
    return {
      order: null,
      orderItems: [],
      showItems: false,
      orderItemSelected: null,
      errorMessage: '',
      shift: false,
      addItems: false
    }
  },

  computed: {
    hasPendingItems () {
      return !!this.orderItems.filter(I => I.status === 0).length
    },

    companyType () {
      return this.user.business_type
    },

    orderId () {
      return this.$route.params.orderId
    },

    clientName () {
      return this.order?.client_name ? this.order.client_name : ''
    }
  },

  eventBusCallbacks: {
    'add-items-to-order': 'addItemsToOrder',
    'confirm-kot-order': 'printKOT',
    'reload-order': 'fetchOrderDetails'
  },

  methods: {
    ...mapActions('pos', ['findOrder', 'getOrderItems', 'addItemToOrder']),
    ...mapMutations('notify', ['notify']),

    addItemsToOrder () {
      this.addItems = true
    },

    addMenuItemToOrder (menuItem) {
      const quantity = 1

      const filters = {
        order_id: this.orderId,
        menu_item_id: menuItem.id,
        item_unit_price: menuItem.price,
        menu_item_price: (menuItem.price * quantity),
        quantity,
        notes: '',
        status: 0,
        added_by: this.user.id,
        add_order_item: this.orderId,
        time: this.time
      }

      this.addItemToOrder(filters)
        .then(res => {
          const message = res.error ? res.message : `${menuItem.name} was added!`
          this.fetchOrderDetails()
          this.notify(message)
        })
        .catch(e => {
          this.notify(e)
        })
    },

    viewPendingItems (orderItem) {
      this.orderItemSelected = orderItem
      this.showItems = true
    },

    fetchOrderDetails () {
      this.findOrder(this.$route.params.orderId)
        .then(response => {
          this.order = response.data.orders[0]
          return this.getOrderItems(this.$route.params.orderId)
        })
        .then(items => {
          this.orderItems = items.data
        })
        .catch(e => {
          console.log('Error in fetchOrderDetails', e)
        })
    }
  },

  created () {
    if (!this.$route.params.orderId) {
      return this.$router.replace({ name: 'sections' })
    }
    this.fetchOrderDetails()
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

    .runnning_order {
      height: 100%;
      width: 100%;
      background-color: $white;
      display: flex;
      flex-direction: column;
      box-shadow: $elevation-default;
      color: $black;

      .order_header {
          height: 96px;
          background-color: $header;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-left: 15px;
          padding-top: 10px;

          p .clock_icon {
              color: $black;
          }
      }

      .items_list {
          height: calc(100vh - 208px);
          overflow-y: auto;
          box-shadow: $elevation-default;

          .items {
              display: flex;
              flex-direction: column;
          }
      }

      .order_sum_info {
          height: 400px;
          display: flex;
          flex-direction: column;
          background-color: #d8dfe2; // $header;
      }
    }
</style>
