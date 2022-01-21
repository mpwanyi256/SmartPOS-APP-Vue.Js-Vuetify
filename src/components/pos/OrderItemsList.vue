<template>
    <Basemodal
      :title="`(${itemsLength}) ${item.item_name}`"
      size="100%" @close="$emit('close')">
        <div class="menu_items">
          <OrderItemPreview
            v-for="item in orderItemsList"
            :key="item.id"
            :orderItem="item"
            @delete="deleteItem"
            @note="addItemNote"
            @cancel="cancelOrderItem"
          />
        </div>
    </Basemodal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Basemodal from '@/components/generics/Basemodal.vue'
import OrderItemPreview from '@/components/order/OrderItemPreview.vue'

export default {
  name: 'OrderItemsList',
  components: {
    Basemodal,
    OrderItemPreview
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      orderItemsList: []
    }
  },
  computed: {
    ...mapGetters('auth', ['user']),
    itemsLength () {
      return this.orderItemsList.length
    }
  },

  created () {
    this.fetchOrderItems()
  },

  methods: {
    ...mapActions('pos', ['getOrderItems', 'updateRunningOrder', 'addItemToOrder']),
    // ...mapActions('pos', ['updateRunningOrder']),

    async addItemNote (note) {
      await this.updateRunningOrder(note)
      await this.fetchOrderItems()
      this.$eventBus.$emit('reload-order')
    },

    cancelOrderItem (item) {
      this.addItemToOrder({
        reason: item.reason.toUpperCase(),
        cancel_order_item: item.id,
        order_id: item.order_id,
        cancelled_by: this.user.id
      })
        .then(async (cancelled) => {
          if (!cancelled.error) {
            await this.fetchOrderItems()
            this.$eventBus.$emit('reload-order')
            const CancelledItemId = cancelled.cancelled_item_id
            this.$eventBus.$emit('print-cancellation-kot',
              {
                cancel_id: CancelledItemId,
                reason: item.reason.toUpperCase()
              })
          } else {
            this.notify('Item cancellation failed')
          }
        })
        .catch(e => {
          console.log('Error in cancelOrderItem', e)
        })
      // TO DO :: add email notification
    },

    async deleteItem (orderItemId) {
      const filter = {
        delete_order_item: orderItemId
      }
      await this.updateRunningOrder(filter)
      await this.fetchOrderItems()
      this.$eventBus.$emit('reload-order')
      if (this.itemsLength === 0) this.$emit('close')
    },

    async fetchOrderItems () {
      const items = await this.getOrderItems(this.item.order_id)
      if (!items.error) {
        const Items = items.data.find((Item) => Item.id === this.item.id)
        if (!Items) {
          this.$emit('close')
          return
        }
        const OrderItems = Items.items_list.sort((a, b) => a.status - b.status)
        if (Items) this.orderItemsList = OrderItems
      }
    }
  }
}
</script>
<style scoped lang="scss">
    .menu_items {
        max-height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        overflow-y: auto;
    }
</style>
